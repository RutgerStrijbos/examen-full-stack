import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';
import { Role } from '../types';
import { UnauthorizedError } from 'express-jwt';

const getAllTeachers = async (): Promise<Teacher[]> => {
    const teachers = await teacherDb.getAllTeachers();

    if (teachers.length === 0) {
        throw new Error('No teachers found');
    }

    return teacherDb.getAllTeachers();
};

const updateLearningPath = async (
    teacherId: number,
    learningPath: string,
    userRole: Role
): Promise<Teacher> => {
    if (userRole !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to perform this action',
        });
    }
    if (!learningPath?.trim()) {
        throw new Error('Learning path is required');
    }
    if (!teacherId) {
        throw new Error('Teacher ID is required');
    }
    const teacher = await teacherDb.getTeacherById(teacherId);
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    const newTeacher = new Teacher({ ...teacher, learningPath });
    const updatedteacher = teacherDb.updateLearningPath(newTeacher);

    return updatedteacher;
};

export default { getAllTeachers, updateLearningPath };
