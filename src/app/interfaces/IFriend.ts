import { Document } from 'mongoose';
import { IUser } from './IUser';

export enum FriendStatus {
  addFriend,
  requested,
  pending,
  friends
}

export interface IFriend extends Document {
  status: FriendStatus;
  recipient: IUser;
  requester: IUser;
}
