import { Router } from 'express';
import { UserController } from '../app/controllers/user-controller';
import { userAuthentication } from '../app/middlewares/user-authentication';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post('/', userController.create);
usersRoutes.get('/search', userAuthentication, userController.search);

export { usersRoutes };
