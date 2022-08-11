import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { friendsRoutes } from './friends.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/friends', friendsRoutes);

export { router };
