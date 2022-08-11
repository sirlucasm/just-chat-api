import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Friend'
  }],
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  const user: any = this;

  if (!user.isModified('password')) return next();

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  return next();
})

const User = model<IUser>('User', UserSchema);

export { User };
