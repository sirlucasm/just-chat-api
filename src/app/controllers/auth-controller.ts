import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppErrors';
import { User } from '../schemas/user';
import { authenticateUser } from '../../utils/user';
import bcrypt from 'bcryptjs';

class AuthController {
  async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) throw new AppError('Some credentials are wrong', 400);

      const passHashCompare = await bcrypt.compare(password, user.password);

      if (!passHashCompare) throw new AppError('Some credentials are wrong', 400);

      const token = authenticateUser(user._id);

      return res.json({ user, token });

    } catch (error: any) {
      next(error);
    }
  }

  async currentUser (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { currentUser } = req;

      return res.json(currentUser);
    } catch (error: any) {
      next(error);
    }
  }
}

export { AuthController };
