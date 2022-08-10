import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { User } from '../schemas/user';

class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password, name } = req.body;

      const findUser = await User.findOne({ username });
      if (findUser) throw new AppError('User already exists', 400);

      const user = await User.create({ username, password, name });

      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }
}

export { UserController };
