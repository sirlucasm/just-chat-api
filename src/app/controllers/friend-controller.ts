import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { FriendStatus } from '../interfaces/IFriend';
import { Friend } from '../schemas/friend';
import { User } from '../schemas/user';

class FriendController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { recipient, requester } = req.body;

      const findFriend = await Friend.findOne({ $or: [
          {requester}, {recipient: requester},
          {recipient}, {requester: recipient},
        ]
      });
      if (findFriend) throw new AppError('Request already sended', 400);

      const friend = await Friend.findOneAndUpdate(
        { requester, recipient },
        { $set: { status: FriendStatus.requested }},
        { upsert: true, new: true }
      );

      return res.status(201).json(friend);
    } catch (error: any) {
      next(error);
    }
  }
}

export { FriendController };
