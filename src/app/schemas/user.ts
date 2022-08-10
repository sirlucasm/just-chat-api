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

UserSchema.pre('save', async function (this: any, next) {
  const hash = bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

const User = model<IUser>('User', UserSchema);

export { User };
