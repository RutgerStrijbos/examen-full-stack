import database from '../util/database';
import { ClassRoom } from '../model/classroom';

const getClassRoomByName = async (name: string): Promise<ClassRoom | null> => {
    try {
        const ClassRoomPrisma = await database.classRoom.findUnique({
            where: { name },
        });
        return ClassRoomPrisma ? ClassRoom.from(ClassRoomPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const createClassRoom = async (classRoom: ClassRoom): Promise<ClassRoom> => {
    try {
        const ClassRoomPrisma = await database.classRoom.create({ data: classRoom });
        return ClassRoom.from(ClassRoomPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default { getClassRoomByName, createClassRoom };
