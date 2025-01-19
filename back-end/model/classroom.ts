import { ClassRoom as ClassRooomPrisma } from '@prisma/client';

export class ClassRoom {
    id?: number;
    name: string;

    constructor(classroom: { id?: number; name: string }) {
        this.validate(classroom);
        this.id = classroom.id;
        this.name = classroom.name;
    }
    validate(classroom: { id?: number; name: string }) {
        if (!classroom.name?.trim()) {
            throw new Error('Name is required');
        }
        if (classroom.name.length > 10) {
            throw new Error('Name cannot be longer than 10 characters');
        }
    }

    static from({ id, name }: ClassRooomPrisma): ClassRoom {
        return new ClassRoom({ id, name });
    }
}
