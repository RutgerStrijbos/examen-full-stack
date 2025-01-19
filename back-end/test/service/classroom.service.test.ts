import { ClassRoom } from '../../model/classroom';
import { Role, ClassRoomInput } from '../../types';
import classRoomService from '../../service/classroom.service';
import classRoomDb from '../../repository/classroom.db';
import { UnauthorizedError } from 'express-jwt';

let mockGetClassRoomByName: jest.Mock;
let mockCreateClassRoom: jest.Mock;

beforeEach(() => {
    mockGetClassRoomByName = jest.fn();
    mockCreateClassRoom = jest.fn();

    classRoomDb.getClassRoomByName = mockGetClassRoomByName;
    classRoomDb.createClassRoom = mockCreateClassRoom;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid classroom input and admin role, when: createClassRoom is called, then: classroom is created successfully', async () => {
    // given
    const classRoomInput: ClassRoomInput = { name: 'C205' };
    const role: Role = 'admin';

    mockGetClassRoomByName.mockResolvedValue(null);
    mockCreateClassRoom.mockResolvedValue(new ClassRoom(classRoomInput as ClassRoom));

    // when
    const result = await classRoomService.createClassRoom(classRoomInput, role);

    // then
    expect(mockGetClassRoomByName).toHaveBeenCalledTimes(1);
    expect(mockGetClassRoomByName).toHaveBeenCalledWith('C205');
    expect(mockCreateClassRoom).toHaveBeenCalledTimes(1);
    expect(mockCreateClassRoom).toHaveBeenCalledWith(new ClassRoom(classRoomInput as ClassRoom));
    expect(result).toBeInstanceOf(ClassRoom);
    expect(result.name).toEqual('C205');
});

test('given: non-admin role, when: createClassRoom is called, then: UnauthorizedError is thrown', async () => {
    // given
    const classRoomInput: ClassRoomInput = { name: 'C205' };
    const role: Role = 'teacher';

    // when
    const createClassRoom = async () =>
        await classRoomService.createClassRoom(classRoomInput, role);

    // then
    await expect(createClassRoom).rejects.toThrow(UnauthorizedError);
    await expect(createClassRoom).rejects.toThrow('You are not authorized to perform this action');
    expect(mockGetClassRoomByName).not.toHaveBeenCalled();
    expect(mockCreateClassRoom).not.toHaveBeenCalled();
});

test('given: classroom with no name, when: createClassRoom is called, then: error is thrown', async () => {
    // given
    const classRoomInput: ClassRoomInput = { name: '' };
    const role: Role = 'admin';

    // when
    const createClassRoom = async () =>
        await classRoomService.createClassRoom(classRoomInput, role);

    // then
    await expect(createClassRoom).rejects.toThrow('Name is required');
    expect(mockGetClassRoomByName).not.toHaveBeenCalled();
    expect(mockCreateClassRoom).not.toHaveBeenCalled();
});

test('given: classroom name already exists, when: createClassRoom is called, then: error is thrown', async () => {
    // given
    const classRoomInput: ClassRoomInput = { name: 'C205' };
    const role: Role = 'admin';

    mockGetClassRoomByName.mockResolvedValue(new ClassRoom(classRoomInput as ClassRoom));

    // when
    const createClassRoom = async () =>
        await classRoomService.createClassRoom(classRoomInput, role);

    // then
    await expect(createClassRoom).rejects.toThrow('Classroom already exists.');
    expect(mockGetClassRoomByName).toHaveBeenCalledTimes(1);
    expect(mockGetClassRoomByName).toHaveBeenCalledWith('C205');
    expect(mockCreateClassRoom).not.toHaveBeenCalled();
});
