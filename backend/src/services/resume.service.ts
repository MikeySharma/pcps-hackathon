// src/services/resume.service.ts
import { AppDataSource } from '../data-source';
import { Resume } from '../entities/resume.entity';
import { ObjectId } from 'mongodb';

const resumeRepository = AppDataSource.getMongoRepository(Resume);

export class ResumeService {
    static async createResume(userId: ObjectId, title: string): Promise<Resume> {
        const resume = new Resume();
        resume.userId = userId;
        resume.title = title;
        resume.content = { sections: [] };
        return await resumeRepository.save(resume);
    }

    static async getUserResumes(userId: ObjectId): Promise<Resume[]> {
        return await resumeRepository.find({ where: { userId } });
    }

    static async getResumeById(id: ObjectId, userId: ObjectId): Promise<Resume | null> {
        return await resumeRepository.findOne({ where: { _id: id, userId } });
    }

    static async updateResumeContent(id: ObjectId, userId: ObjectId, content: any): Promise<Resume | null> {
        const resume = await resumeRepository.findOne({ where: { _id: id, userId } });
        if (!resume) return null;
        
        resume.content = content;
        return await resumeRepository.save(resume);
    }

    static async deleteResume(id: ObjectId, userId: ObjectId): Promise<boolean> {
        const result = await resumeRepository.deleteOne({ _id: id, userId });
        return result.deletedCount === 1;
    }
}