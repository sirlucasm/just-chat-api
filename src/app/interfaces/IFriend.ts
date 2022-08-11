import { Document } from 'mongoose';

export enum FriendStatus {
  PENDING='pending',
  FRIENDS='friends',
  BLOCKED='blocked'
}

export interface IFriend extends Document {
  status: FriendStatus;
  recipient: string;
  requester: string;
}
