import { User } from '../../model/user';
import { Role } from '../../types';

test('given: valid user data, when: user is created, then: user is created with those values', () => {
    // given
    const validUserData = {
        username: 'rutgers',
        firstName: 'Rutger',
        lastName: 'Strijbos',
        email: 'rutger@gmail.com',
        password: 'rutger123',
        role: 'admin' as Role,
    };

    // when
    const user = new User(validUserData);

    // then
    expect(user.username).toEqual(validUserData.username);
    expect(user.firstName).toEqual(validUserData.firstName);
    expect(user.lastName).toEqual(validUserData.lastName);
    expect(user.email).toEqual(validUserData.email);
    expect(user.password).toEqual(validUserData.password);
    expect(user.role).toEqual(validUserData.role);
});

test('given: missing username, when: user is created, then: an error is thrown', () => {
    // given
    const invalidUserData = {
        firstName: 'Rutger',
        lastName: 'Strijbos',
        email: 'rutger@gmail.com',
        password: 'rutger123',
        role: 'admin' as Role,
    };

    // when
    const createUser = () => new User(invalidUserData as any);

    // then
    expect(createUser).toThrow('Username is required');
});

test('given: missing first name, when: user is created, then: an error is thrown', () => {
    // given
    const invalidUserData = {
        username: 'rutgers',
        lastName: 'Strijbos',
        email: 'rutger@gmail.com',
        password: 'rutger123',
        role: 'admin' as Role,
    };

    // when
    const createUser = () => new User(invalidUserData as any);

    // then
    expect(createUser).toThrow('First name is required');
});

test('given: missing email, when: user is created, then: an error is thrown', () => {
    // given
    const invalidUserData = {
        username: 'rutgers',
        firstName: 'Rutger',
        lastName: 'Strijbos',
        password: 'rutger123',
        role: 'admin' as Role,
    };

    // when
    const createUser = () => new User(invalidUserData as any);

    // then
    expect(createUser).toThrow('Email is required');
});
