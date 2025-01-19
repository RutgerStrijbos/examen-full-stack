/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      ClassRoomInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Classroom name.
 *              maxLength: 10
 *      ClassRoom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *              maxLength: 10
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import classRoomService from '../service/classroom.service';
import { ClassRoomInput, Role } from '../types/index';

const classRoomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassRoomInput'
 *     responses:
 *       200:
 *         description: The classroom was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassRoom'
 * */

classRoomRouter.post(
    '/',
    async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
        try {
            const classRoomInput = <ClassRoomInput>req.body;
            const userRole = req.auth.role as Role;
            const classRoom = await classRoomService.createClassRoom(classRoomInput, userRole);
            res.status(200).json(classRoom);
        } catch (error) {
            next(error);
        }
    }
);

export { classRoomRouter };
