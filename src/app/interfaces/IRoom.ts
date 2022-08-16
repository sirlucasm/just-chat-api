import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface IRoom extends Document {
  name: string;
  description: string;
  members: [IUser];
  admins: [IUser];
  createdBy: IUser;
}
