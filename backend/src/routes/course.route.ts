// course.routes.ts
import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { CourseController } from '../controllers/course.controller';

const router = express.Router();

// Search courses
router.get('/search', CourseController.searchCourses);

// Get course details
router.get('/:id', CourseController.getCourseDetails);

// Get user's courses (requires authentication)
router.get('/user/courses', authenticate, CourseController.getUserCourses);

// Bookmark/unbookmark a course (requires authentication)
router.post('/:courseId/bookmark', authenticate, CourseController.bookmarkCourse);

// Update course progress (requires authentication)
router.post('/:courseId/progress', authenticate, CourseController.updateProgress);

// Get featured courses
router.get('/featured', CourseController.getFeaturedCourses);

export const courseRoutes = router;