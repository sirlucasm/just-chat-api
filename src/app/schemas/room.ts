import { Schema, model } from 'mongoose';
import { IRoom } from '../interfaces/IRoom';

const RoomSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Room = model<IRoom>('Room', RoomSchema);

export { Room, RoomSchema };
