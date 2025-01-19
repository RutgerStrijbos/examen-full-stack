import { Teacher } from '../../model/teacher';
import { User } from '../../model/user';

const user = new User({
    id: 1,
    username: 'rutgers',
    firstName: 'Rutger',
    lastName: 'Strijbos',
    email: 'rutger@gmail.com',
    password: 'rutger123',
    role: 'teacher',
});

test('given: valid values for teacher, when: teacher is created, then: teacher is created with those values', () => {
    // given
    const learningPath = 'Software Engineering';

    // when
    const teacher = new Teacher({ user, learningPath });

    // then
    expect(teacher.user).toEqual(user);
    expect(teacher.learningPath).toEqual(learningPath);
});

test('given: no learning path is provided, when: teacher is created, then: an error is thrown', () => {
    // given
    const invalidLearningPath = '';

    // when
    const createTeacher = () => new Teacher({ user, learningPath: invalidLearningPath });

    // then
    expect(createTeacher).toThrow('Learning path is required');
});

test('given: learning path exceeds maximum length, when: teacher is created, then: an error is thrown', () => {
    // given
    const invalidLearningPath = 'A'.repeat(51); // 51 characters

    // when
    const createTeacher = () => new Teacher({ user, learningPath: invalidLearningPath });

    // then
    expect(createTeacher).toThrow('Learning path is too long');
});
