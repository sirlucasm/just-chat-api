import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { User } from '../schemas/user';
import { authenticateUser } from '../../utils/user';

class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password, name } = req.body;

      const findUser = await User.findOne({ username });
      if (findUser) throw new AppError('User already exists', 400);

      const user = await User.create({ username, password, name });
      const token = authenticateUser(user._id);

      if (!token) throw new AppError('Token could not be created', 400);

      return res.status(201).json({ user, token });
    } catch (error: any) {
      next(error);
    }
  }
}

export { UserController };
