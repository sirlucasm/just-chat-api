import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { IChat } from '../interfaces/IChat';
import { IRoom } from '../interfaces/IRoom';
import { Chat } from '../schemas/chat';
import { Room } from '../schemas/room';

class RoomController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser, body } = req;
      const { id: userId } = currentUser;
      const { name, description } = body;

      const createdRoom = await Room.create({
        name,
        description,
        createdBy: userId,
        members: [ userId ],
        admins: [ userId ]
      });

      const room = await createdRoom.populate(['members', 'createdBy', 'admins']);

      await Chat.create({ room: room });

      return res.status(201).json(room);
    } catch (error: any) {
      next(error);
    }
  }

  async joinRoom(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser, params } = req;
      const { id: userId } = currentUser;
      const { roomId } = params;

      const room = await Room.findById<IRoom>(roomId).populate(['members']);
      const chat = await Chat.findOne<IChat>({ 'room._id': roomId }).populate(['room', 'room.members']);

      if(!room) throw new AppError('Room not found', 404);
      if (room.members.some(data => data.id === userId)) throw new AppError("You're already a member");

      room.members.push(userId);
      await room.save();
      if (chat) {
        chat.room.members.push(userId);
        await chat.save();
      }

      return res.json(await room.populate(['members', 'createdBy', 'admins']));
    } catch (error: any) {
      next(error);
    }
  }
};

export { RoomController };
