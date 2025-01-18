import { User } from './user';
import { Teacher as TeacherPrisma, User as UserPrisma } from '@prisma/client';

export class Teacher {
    readonly id?: number;
    readonly user: User;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly learningPath: string;

    constructor(teacher: {
        id?: number;
        user: User;
        createdAt?: Date;
        updatedAt?: Date;
        learningPath: string;
    }) {
        this.validate(teacher);
        this.id = teacher.id;
        this.user = teacher.user;
        this.createdAt = teacher.createdAt;
        this.updatedAt = teacher.updatedAt;
        this.learningPath = teacher.learningPath;
    }
    validate(teacher: {
        id?: number;
        user: User;
        createdAt?: Date;
        updatedAt?: Date;
        learningPath: string;
    }) {
        if (!teacher.user) {
            throw new Error('User is required');
        }
        if (!teacher.learningPath?.trim()) {
            throw new Error('Learning path is required');
        }
        if (teacher.learningPath.length > 50) {
            throw new Error('Learning path is too long');
        }
    }

    static from({
        id,
        createdAt,
        updatedAt,
        learningPath,
        user,
    }: TeacherPrisma & { user: UserPrisma }): Teacher {
        return new Teacher({
            id,
            user: User.from(user),
            createdAt,
            updatedAt,
            learningPath,
        });
    }
}
