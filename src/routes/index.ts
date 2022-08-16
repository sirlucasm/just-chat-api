import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { chatRoutes } from './chat.routes';
import { friendsRoutes } from './friends.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/friends', friendsRoutes);
router.use('/chats', chatRoutes);

export { router };
