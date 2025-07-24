import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { ObjectId } from "mongodb";

@Entity({ name: "courses" })
export class Course {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    @Index({ unique: true })
    tavilyId!: string; // Changed from googleId to tavilyId

    @Column()
    @Index({ fulltext: true })
    title!: string;

    @Column({ type: 'text' })
    @Index({ fulltext: true })
    description!: string;

    @Column('simple-array')
    @Index({ fulltext: true })
    categories!: string[];

    @Column()
    provider!: string; // e.g., "Coursera", "Udemy", "edX", "YouTube"

    @Column()
    url!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ type: 'float', nullable: true })
    rating?: number;

    @Column({ nullable: true })
    duration?: string; // e.g., "10 weeks", "20 hours", "1:23:45" for videos

    @Column({ default: false })
    isFree!: boolean;

    @Column({ default: false })
    isVideo!: boolean; // New field to distinguish video courses

    @Column({ nullable: true })
    price?: string;

    @Column({ type: 'simple-json', nullable: true })
    instructors?: Array<{
        name: string;
        imageUrl?: string;
    }>;

    @Column({ nullable: true })
    channelName?: string; // For YouTube videos

    @Column({ nullable: true })
    viewCount?: number; // For YouTube videos

    @Column({ nullable: true })
    publishedAt?: Date; // For YouTube videos

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ default: false })
    isFeatured!: boolean;

    @Column({ default: 0 })
    popularityScore!: number;

    @Column({ type: 'simple-array', nullable: true })
    tags?: string[]; // Additional metadata for better search
}