import { Document } from 'mongoose';

export interface IMessage extends Document {
  text: string;
  user: string;
  deleted: boolean;
}
