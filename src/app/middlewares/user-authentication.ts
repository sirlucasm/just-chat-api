import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../schemas/user';

export async function userAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token not provided' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded: any = verify(token, process.env.USER_JWT_KEY || '');

    const user = await User.findOne({ _id: decoded._id });

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.currentUser = user;

    return next();

  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}
