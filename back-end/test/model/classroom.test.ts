import { ClassRoom } from '../../model/classroom';

test('given: valid values for classroom, when: classroom is created, then: classroom is created with those values', () => {
    // given
    const name = 'C250';

    // when
    const classroom = new ClassRoom({ name });

    // then
    expect(classroom.name).toEqual(name);
});

test('given: no name is provided, when: classroom is created, then: an error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const createClassRoom = () => new ClassRoom({ name: invalidName });

    // then
    expect(createClassRoom).toThrow('Name is required');
});

test('given: name exceeds maximum length, when: classroom is created, then: an error is thrown', () => {
    // given
    const invalidName = 'VeryLongNameIsThis';

    // when
    const createClassRoom = () => new ClassRoom({ name: invalidName });

    // then
    expect(createClassRoom).toThrow('Name cannot be longer than 10 characters');
});
