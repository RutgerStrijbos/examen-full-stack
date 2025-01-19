import { User } from '../model/user';

type Role = 'admin' | 'student' | 'teacher';

type UserInput = {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
};

type TeacherInput = {
    id?: number;
    user?: UserInput;
    learningPath?: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

type ClassRoomInput = {
    id?: number;
    name?: string;
};

export { Role, TeacherInput, UserInput, AuthenticationResponse, ClassRoomInput };
