import { Schema, model } from 'mongoose';
import { FriendStatus, IFriend } from '../interfaces/IFriend';

const FriendSchema = new Schema({
  status: {
    type: String,
    enum: FriendStatus,
    default: FriendStatus.PENDING
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

const Friend = model<IFriend>('Friend', FriendSchema);

export { Friend };
