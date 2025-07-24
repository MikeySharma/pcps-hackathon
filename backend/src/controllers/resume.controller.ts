// src/controllers/resume.controller.ts
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ResumeService } from '../services/resume.service';
import { PdfService } from '../services/pdf.service';

export class ResumeController {
    static async createResume(req: Request, res: Response) {
        try {
            if (!req.authUser || !req.authUser.id) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
            }
            const resume = await ResumeService.createResume(
                new ObjectId(req.authUser.id),
                req.body.title || 'My Resume'
            );
            res.status(201).json({ success: true, data: resume });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to create resume' });
        }
    }

    static async getUserResumes(req: Request, res: Response) {
        try {
            if (!req.authUser || !req.authUser.id) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
            }
            const resumes = await ResumeService.getUserResumes(
                new ObjectId(req.authUser.id)
            );
            res.json({ success: true, data: resumes });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to get resumes' });
        }
    }

    static async updateResume(req: Request, res: Response) {
        try {
            if (!req.authUser || !req.authUser.id) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
            }
            const resume = await ResumeService.updateResumeContent(
                new ObjectId(req.params.id),
                new ObjectId(req.authUser.id),
                req.body.content
            );

            if (!resume) {
                return res.status(404).json({ success: false, message: 'Resume not found' });
            }

            res.json({ success: true, data: resume });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to update resume' });
        }
    }

    static async downloadResume(req: Request, res: Response) {
        try {
            if (!req.authUser || !req.authUser.id) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
            }
            const resume = await ResumeService.getResumeById(
                new ObjectId(req.params.id),
                new ObjectId(req.authUser.id)
            );

            if (!resume) {
                return res.status(404).json({ success: false, message: 'Resume not found' });
            }

            const pdfBuffer = await PdfService.generateResumePdf(resume.content);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${resume.title}.pdf"`);
            res.send(pdfBuffer);
        } catch (error) {
            console.error('PDF generation error:', error);
            res.status(500).json({ success: false, message: 'Failed to generate PDF' });
        }
    }
}