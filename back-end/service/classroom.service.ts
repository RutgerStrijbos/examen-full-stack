import { ClassRoom } from '../model/classroom';
import { Role, ClassRoomInput } from '../types';
import classRoomDb from '../repository/classroom.db';
import { UnauthorizedError } from 'express-jwt';

const createClassRoom = async (classRoomInput: ClassRoomInput, role: Role): Promise<ClassRoom> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to perform this action',
        });
    }
    if (!classRoomInput.name?.trim()) {
        throw new Error('Name is required');
    }

    const existingClassRoom = await classRoomDb.getClassRoomByName(classRoomInput.name);
    if (existingClassRoom) {
        throw new Error('Classroom already exists.');
    }

    const newClassRoom = new ClassRoom(classRoomInput as ClassRoom);
    const createdClassRoom = await classRoomDb.createClassRoom(newClassRoom);

    return createdClassRoom;
};

export default { createClassRoom };
