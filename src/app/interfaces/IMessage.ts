import { Document } from 'mongoose';

export interface IMessage extends Document {
  text: string;
  user: string;
  chat: string;
  deleted: boolean;
}
