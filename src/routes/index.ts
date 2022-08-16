import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { chatRoutes } from './chats.routes';
import { friendsRoutes } from './friends.routes';
import { roomsRoutes } from './rooms.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/friends', friendsRoutes);
router.use('/chats', chatRoutes);
router.use('/rooms', roomsRoutes);

export { router };
