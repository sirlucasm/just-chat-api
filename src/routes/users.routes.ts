import { Router } from 'express';
import { UserController } from '../app/controllers/user-controller';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post('/', userController.create);
usersRoutes.get('/search', userController.search);

export { usersRoutes };
