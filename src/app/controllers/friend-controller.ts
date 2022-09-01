import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { FriendStatus } from '../interfaces/IFriend';
import { Chat } from '../schemas/chat';
import { Friend } from '../schemas/friend';
import { User } from '../schemas/user';

class FriendController {
  async sendFriendRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser, body } = req;
      const { recipient } = body;
      const { id: userId } = currentUser;

      if (recipient === userId) throw new AppError('You cannot send request to yourself', 400);

      const findFriend = await Friend.findOne({
        $or: [
          { $and: [ {requester: userId}, {recipient} ] },
          { $and: [ {recipient: userId}, {requester: recipient} ] }
        ]
      });
      if (findFriend) throw new AppError('Request already sended', 400);

      const friend = await Friend.create({
        requester: userId, recipient, status: FriendStatus.PENDING
      });

      return res.status(201).json(friend);
    } catch (error: any) {
      next(error);
    }
  }

  async listFriendRequestsSendedByMe(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser } = req;
      const { id: userId } = currentUser;

      const requests = await Friend.find({ requester: userId, status: FriendStatus.PENDING }).populate(['recipient', 'requester']);

      return res.json(requests);
    } catch (error: any) {
      next(error);
    }
  }

  async listFriendRequestsReceived(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser } = req;
      const { id: userId } = currentUser;

      const requests = await Friend.find({ recipient: userId, status: FriendStatus.PENDING }).populate(['recipient', 'requester']);

      return res.json(requests);
    } catch (error: any) {
      next(error);
    }
  }

  async acceptFriendRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // when user accept friend request, should create a room name to private chats for both

      const { currentUser, body } = req;
      const { id: userId } = currentUser;
      const { friendId } = body;

      let request = await Friend.findOne({ _id: friendId });
      if (!request) throw new AppError('Friend request not found', 404);

      if (request.status === FriendStatus.FRIENDS) throw new AppError('You are already friends', 400);
      if (request.requester.toString() === userId) throw new AppError('You cannot accept friend request sent by yourself', 400);
      if (request.recipient.toString() !== userId) throw new AppError('You cannot accept another user friend request', 400);

      request.status = FriendStatus.FRIENDS;
      await request.save();

      await Chat.create({ friend: request });

      return res.json(request);
    } catch (error: any) {
      next(error);
    }
  }

  async listFriends(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser } = req;
      const { id: userId } = currentUser;

      const friends = await Friend.find({
        $or: [
          { requester: userId },
          { recipient: userId },
        ],
        $and: [{ status: FriendStatus.FRIENDS }]
      });

      return res.json(friends);
    } catch (error: any) {
      next(error);
    }
  }

  async refuseFriendRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { params } = req;
      const { friendId } = params;

      let request = await Friend.findOne({ _id: friendId });
      if (!request) throw new AppError('Friend request not found', 404);

      await request.delete();

      return res.send();
    } catch (error: any) {
      next(error);
    }
  }

  async findFriendshipByUserId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser, query } = req;
      const { id: currentUserId } = currentUser;
      const { userId } = query;

      const friends = await Friend.findOne({
        $or: [
          { $and: [ { requester: currentUserId, recipient: userId } ] },
          { $and: [ { requester: userId, recipient: currentUserId } ] },
        ]
      }).populate(['recipient', 'requester']);

      return res.json(friends);
    } catch (error: any) {
      next(error);
    }
  }
}

export { FriendController };
