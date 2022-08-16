import { Schema, model } from 'mongoose';
import { IChat } from '../interfaces/IChat';
import { FriendSchema } from './friend';
import { RoomSchema } from './room';

const ChatSchema = new Schema({
  friend: FriendSchema,
  room: RoomSchema,
  messageInfo: {
    read: { type: Boolean, default: false },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    unreadMessagesCount: { type: Number, default: 0 }
  },
  filed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Chat = model<IChat>('Chat', ChatSchema);

export { Chat };
