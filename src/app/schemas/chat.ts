import { Schema, model } from 'mongoose';
import { IChat } from '../interfaces/IChat';

const ChatSchema = new Schema({
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'Friend',
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
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
