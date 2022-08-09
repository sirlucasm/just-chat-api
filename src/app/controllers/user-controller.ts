import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    return res.status(201).json({ username });
  }
}

export { UserController };
