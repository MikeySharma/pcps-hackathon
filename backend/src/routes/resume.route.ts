// src/routes/resume.route.ts
import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { ResumeController } from '../controllers/resume.controller';

const router = express.Router();


router.post('/', authenticate, ResumeController.createResume);
router.get('/', authenticate, ResumeController.getUserResumes);
router.put('/:id', authenticate, ResumeController.updateResume);
router.get('/:id/download', authenticate, ResumeController.downloadResume);

export const resumeRoutes = router;