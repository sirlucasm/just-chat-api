import { Router } from 'express';
import { friendsRoutes } from './friends.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/friends', friendsRoutes);

export { router };
