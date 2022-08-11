import { Router } from 'express';
import { AuthController } from '../app/controllers/auth-controller';
import { userAuthentication } from '../app/middlewares/user-authentication';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login);
authRoutes.get('/me', userAuthentication, authController.currentUser);

export { authRoutes };
