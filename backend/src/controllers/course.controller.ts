import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import { ObjectId } from 'mongodb';

interface CourseResponse {
    id: ObjectId;
    title: string;
    description: string;
    provider: string;
    url: string;
    imageUrl?: string;
    categories: string[];
    rating?: number;
    duration?: string;
    isFree: boolean;
    price?: string;
    isBookmarked?: boolean;
    progress?: number;
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export class CourseController {
    static async searchCourses(req: Request, res: Response<ApiResponse<CourseResponse[]>>): Promise<Response> {
        try {
            const { query } = req.query;
            if (!query || typeof query !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }

            const courses = await CourseService.searchCourses(query);
            const userId = req.authUser?.id;

            // Enhance with user-specific data if logged in
            const enhancedCourses = await Promise.all(
                courses.map(async course => {
                    const response: CourseResponse = {
                        id: course._id,
                        title: course.title,
                        description: course.description,
                        provider: course.provider,
                        url: course.url,
                        imageUrl: course.imageUrl,
                        categories: course.categories,
                        rating: course.rating,
                        duration: course.duration,
                        isFree: course.isFree,
                        price: course.price
                    };

                    if (userId) {
                        const userCourses = await CourseService.getUserCourses(userId);
                        const userCourse = userCourses.find(uc => uc.course._id.equals(course._id));
                        if (userCourse) {
                            response.isBookmarked = userCourse.userCourse.isBookmarked;
                            response.progress = userCourse.userCourse.progress;
                        }
                    }

                    return response;
                })
            );

            return res.json({
                success: true,
                data: enhancedCourses
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Search failed';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }

    static async getCourseDetails(req: Request, res: Response<ApiResponse<CourseResponse>>): Promise<Response> {
        try {
            const { id } = req.params;
            const userId = req.authUser?.id;

            const course = await CourseService.getCourseById(new ObjectId(id));
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            const response: CourseResponse = {
                id: course._id,
                title: course.title,
                description: course.description,
                provider: course.provider,
                url: course.url,
                imageUrl: course.imageUrl,
                categories: course.categories,
                rating: course.rating,
                duration: course.duration,
                isFree: course.isFree,
                price: course.price
            };

            if (userId) {
                const userCourses = await CourseService.getUserCourses(userId);
                const userCourse = userCourses.find(uc => uc.course._id.equals(course._id));
                if (userCourse) {
                    response.isBookmarked = userCourse.userCourse.isBookmarked;
                    response.progress = userCourse.userCourse.progress;
                }
            }

            return res.json({
                success: true,
                data: response
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get course details';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }

    static async getUserCourses(req: Request, res: Response<ApiResponse<CourseResponse[]>>): Promise<Response> {
        if (!req.authUser) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        try {
            const userCourses = await CourseService.getUserCourses(req.authUser.id);
            const response = userCourses.map(({ course, userCourse }) => ({
                id: course._id,
                title: course.title,
                description: course.description,
                provider: course.provider,
                url: course.url,
                imageUrl: course.imageUrl,
                categories: course.categories,
                rating: course.rating,
                duration: course.duration,
                isFree: course.isFree,
                price: course.price,
                isBookmarked: userCourse.isBookmarked,
                progress: userCourse.progress
            }));

            return res.json({
                success: true,
                data: response
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get user courses';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }

    static async bookmarkCourse(req: Request, res: Response<ApiResponse<{ isBookmarked: boolean }>>): Promise<Response> {
        if (!req.authUser) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        try {
            const { courseId } = req.params;
            const { bookmark } = req.body;

            await CourseService.bookmarkCourse(
                req.authUser.id,
                new ObjectId(courseId),
                bookmark === true
            );

            return res.json({
                success: true,
                data: { isBookmarked: bookmark }
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update bookmark';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }

    static async updateProgress(req: Request, res: Response<ApiResponse<{ progress: number }>>): Promise<Response> {
        if (!req.authUser) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        try {
            const { courseId } = req.params;
            const { progress } = req.body;

            if (typeof progress !== 'number' || progress < 0 || progress > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Progress must be a number between 0 and 100'
                });
            }

            await CourseService.updateCourseProgress(
                req.authUser.id,
                new ObjectId(courseId),
                progress
            );

            return res.json({
                success: true,
                data: { progress }
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update progress';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }

    static async getFeaturedCourses(req: Request, res: Response<ApiResponse<CourseResponse[]>>): Promise<Response> {
        try {
            const courses = await CourseService.getFeaturedCourses();
            const response = courses.map(course => ({
                id: course._id,
                title: course.title,
                description: course.description,
                provider: course.provider,
                url: course.url,
                imageUrl: course.imageUrl,
                categories: course.categories,
                rating: course.rating,
                duration: course.duration,
                isFree: course.isFree,
                price: course.price
            }));

            return res.json({
                success: true,
                data: response
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to get featured courses';
            return res.status(500).json({
                success: false,
                message
            });
        }
    }
}