import { Document } from 'mongoose';

export interface IChat extends Document {
  friend: string;
  room: string;
  filed: boolean;
}
