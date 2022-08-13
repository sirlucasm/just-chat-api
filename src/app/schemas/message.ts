import { Schema, model } from 'mongoose';
import { IMessage } from '../interfaces/IMessage';

const MessageSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = model<IMessage>('Message', MessageSchema);

export { Message };
