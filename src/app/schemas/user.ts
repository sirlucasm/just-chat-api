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
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password || '', 10);
  this.password = hash;

  return next();
})

const User = model<IUser>('User', UserSchema);

export { User };
