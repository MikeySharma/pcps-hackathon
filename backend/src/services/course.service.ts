import { AppDataSource } from '../data-source';
import { Course } from '../entities/course.entity';
import { Users } from '../entities/user.entity';
import { ObjectId } from 'mongodb';
import { UserCourse } from '../entities/user_courses.entity';
import { TavilyClient } from './tavily-client.service';
import cheerio from 'cheerio';
import axios from 'axios';

const courseRepository = AppDataSource.getMongoRepository(Course);
const userCourseRepository = AppDataSource.getMongoRepository(UserCourse);

export class CourseService {
    private static readonly BATCH_SIZE = 15;
    private static readonly TAVILY_DOMAINS = [
        'coursera.org',
        'udemy.com',
        'edx.org',
        'youtube.com',
        'youtu.be'
    ];

    static async searchCourses(query: string, maxResults: number = this.BATCH_SIZE): Promise<Course[]> {
        try {
            // First try to find in database using text search
            const dbCourses = await courseRepository.find({
                where: {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                        { categories: { $regex: query, $options: 'i' } }
                    ]
                },
                take: maxResults,
                order: { popularityScore: 'DESC' }
            });

            if (dbCourses.length >= maxResults) {
                return dbCourses.slice(0, maxResults);
            }

            // If not enough in DB, fetch from Tavily
            const tavilyCourses = await this.fetchCoursesFromTavily(query, maxResults - dbCourses.length);

            // Save new courses to DB
            const newCourses = await this.saveCourses(tavilyCourses);

            // Combine results
            const combinedCourses = [...dbCourses, ...newCourses].slice(0, maxResults);

            // Check for missing images and fetch in parallel
            await this.fillMissingImages(combinedCourses);

            return combinedCourses;
        } catch (error) {
            console.error('Search error:', error);
            // Fallback to simple search if text index isn't available
            const fallbackCourses = await courseRepository.find({
                where: {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } }
                    ]
                },
                take: maxResults,
                order: { popularityScore: 'DESC' }
            });

            await this.fillMissingImages(fallbackCourses);
            return fallbackCourses;
        }
    }

    private static async fillMissingImages(courses: Course[]): Promise<void> {
        const coursesWithMissingImages = courses.filter(course => !course.imageUrl);

        if (coursesWithMissingImages.length === 0) return;

        try {
            // Process all missing images in parallel
            const imageFetchPromises = coursesWithMissingImages.map(async (course) => {
                try {
                    const ogImage = await this.fetchOpenGraphImage(course.url);
                    if (ogImage) {
                        course.imageUrl = ogImage;
                        await courseRepository.update(
                            { _id: course._id },
                            { imageUrl: ogImage }
                        );
                    }
                } catch (error) {
                    console.error(`Error fetching image for course ${course._id}:`, error);
                }
            });

            await Promise.all(imageFetchPromises);
        } catch (error) {
            console.error('Error in parallel image fetching:', error);
        }
    }
    private static async fetchOpenGraphImage(url: string): Promise<string | null> {
        try {
            const response = await axios.get(url, {
                timeout: 5000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const $ = cheerio.load(response.data);
            const ogImage = $('meta[property="og:image"]').attr('content') ||
                $('meta[name="og:image"]').attr('content') ||
                $('link[rel="image_src"]').attr('href');

            return ogImage || null;
        } catch (error) {
            console.error(`Error fetching Open Graph image for ${url}:`, error);
            return null;
        }
    }

    private static async fetchCoursesFromTavily(query: string, count: number): Promise<Partial<Course>[]> {
        const tavily = new TavilyClient();
        try {
            const results = await tavily.search({
                query: `${query} online courses OR tutorials`,
                include_raw_content: false,
                max_results: count,
                include_domains: this.TAVILY_DOMAINS
            });

            return results.results.map((item: any) => {
                const provider = this.determineProvider(item.url);
                const isYouTube = provider === 'YouTube';

                return {
                    tavilyId: this.generateTavilyId(item.url),
                    title: item.title,
                    description: item.description,
                    provider,
                    url: item.url,
                    imageUrl: item.image || null,
                    categories: [query.toLowerCase()],
                    isFree: isYouTube ? true : this.isCourseFree(item.url, provider),
                    isVideo: isYouTube,
                    duration: isYouTube ? this.extractYouTubeDuration(item.description) : null
                };
            });
        } catch (error) {
            console.error('Error fetching from Tavily:', error);
            return [];
        }
    }

    private static async saveCourses(courses: Partial<Course>[]): Promise<Course[]> {
        const savedCourses: Course[] = [];

        for (const courseData of courses) {
            // Check if course already exists
            const existingCourse = await courseRepository.findOne({
                where: { tavilyId: courseData.tavilyId }
            });

            if (existingCourse) {
                savedCourses.push(existingCourse);
                continue;
            }

            // Create new course
            const course = new Course();
            Object.assign(course, courseData);
            const savedCourse = await courseRepository.save(course);
            savedCourses.push(savedCourse);
        }

        return savedCourses;
    }

    private static determineProvider(url: string): string {
        if (url.includes('coursera.org')) return 'Coursera';
        if (url.includes('udemy.com')) return 'Udemy';
        if (url.includes('edx.org')) return 'edX';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
        return 'Other';
    }

    private static isCourseFree(url: string, provider: string): boolean {
        // Simple heuristic - can be enhanced
        if (provider === 'Coursera') return url.includes('audit');
        if (provider === 'edX') return url.includes('course');
        return false; // Udemy courses are rarely free
    }

    private static generateTavilyId(url: string): string {
        return Buffer.from(url).toString('base64');
    }

    private static extractYouTubeDuration(description?: string): string | null {
        if (!description) return null;

        try {
            // Try multiple patterns to extract duration
            const patterns = [
                /(\d+:\d+:\d+)/,    // HH:MM:SS
                /(\d+:\d+)/,         // MM:SS
                /(\d+\s*h(?:ours?)?\s*\d+\s*m(?:inutes?)?)/i,  // 1 hour 30 minutes
                /(\d+\s*m(?:inutes?)?)/i                        // 30 minutes
            ];

            for (const pattern of patterns) {
                const match = description.match(pattern);
                if (match) {
                    return match[0];
                }
            }
            return null;
        } catch (error) {
            console.error('Error extracting YouTube duration:', error);
            return null;
        }
    }


    static async getCourseById(id: ObjectId): Promise<Course | null> {
        return await courseRepository.findOne({ where: { _id: id } });
    }

    static async getCoursesByIds(ids: ObjectId[]): Promise<Course[]> {
        return await courseRepository.find({
            where: { _id: { $in: ids } }
        });
    }

    static async getUserCourses(userId: ObjectId): Promise<{ course: Course; userCourse: UserCourse }[]> {
        const userCourses = await userCourseRepository.find({
            where: { userId },
            order: { lastAccessed: 'DESC' }
        });

        const courseIds = userCourses.map(uc => uc.courseId);
        const courses = await this.getCoursesByIds(courseIds);

        return userCourses.map(userCourse => {
            const course = courses.find(c => c._id.equals(userCourse.courseId))!;
            return { course, userCourse };
        });
    }

    static async bookmarkCourse(userId: ObjectId, courseId: ObjectId, bookmark: boolean): Promise<void> {
        let userCourse = await userCourseRepository.findOne({
            where: { userId, courseId }
        });

        if (!userCourse) {
            userCourse = new UserCourse();
            userCourse.userId = userId;
            userCourse.courseId = courseId;
        }

        userCourse.isBookmarked = bookmark;
        await userCourseRepository.save(userCourse);

        // Update popularity score
        await courseRepository.updateOne(
            { _id: courseId },
            { $inc: { popularityScore: bookmark ? 1 : -1 } }
        );
    }

    static async updateCourseProgress(userId: ObjectId, courseId: ObjectId, progress: number): Promise<void> {
        let userCourse = await userCourseRepository.findOne({
            where: { userId, courseId }
        });

        if (!userCourse) {
            userCourse = new UserCourse();
            userCourse.userId = userId;
            userCourse.courseId = courseId;
        }

        userCourse.progress = Math.min(100, Math.max(0, progress));
        userCourse.lastAccessed = new Date();

        if (progress >= 100) {
            userCourse.completedAt = new Date();
        }

        await userCourseRepository.save(userCourse);
    }

    static async getFeaturedCourses(limit: number = 10): Promise<Course[]> {
        return await courseRepository.find({
            where: { isFeatured: true },
            take: limit,
            order: { popularityScore: 'DESC' }
        });
    }

    static async batchCreateCourses(coursesData: Partial<Course>[]): Promise<Course[]> {
        const courses = coursesData.map(data => {
            const course = new Course();
            Object.assign(course, data);
            return course;
        });

        return await courseRepository.save(courses);
    }
}