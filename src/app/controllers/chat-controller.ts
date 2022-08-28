import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { Chat } from '../schemas/chat';

class ChatController {
  async listChats(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser } = req;
      const { id: userId } = currentUser;

      const chats = await Chat.find({
        $or: [
          { 'friend.recipient': userId },
          { 'friend.requester': userId },
          { 'room.members': userId },
          { 'room.createdBy': userId },
        ]
      })
        .populate([
          {
            path: 'friend.recipient',
            select: ['id', 'name', 'username']
          },
          {
            path: 'friend.requester',
            select: ['id', 'name', 'username']
          },
          {
            path: 'messageInfo.lastMessage',

          }
        ]);

      return res.json(chats);
    } catch (error: any) {
      next(error);
    }
  }
};

export { ChatController };
