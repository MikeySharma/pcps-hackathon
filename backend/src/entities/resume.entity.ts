// src/entities/resume.entity.ts
import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectId } from "typeorm";

@Entity()
export class Resume {
    @ObjectIdColumn()
    _id!: ObjectId;

    @ObjectIdColumn()
    userId!: ObjectId;

    @Column()
    title!: string;

    @Column('json')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content!: any; // Store structured resume data

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ default: 'draft' })
    status!: 'draft' | 'published';
}