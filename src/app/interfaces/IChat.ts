import { Document } from 'mongoose';
import { IFriend } from './IFriend';
import { IRoom } from './IRoom';

export interface IChat extends Document {
  friend: IFriend;
  room: IRoom;
  filed: boolean;
  messageInfo: {
    read: boolean;
    lastMessage: string;
    unreadMessagesCount: number;
  }
}
