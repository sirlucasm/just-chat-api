import { Router } from 'express';
import { FriendController } from '../app/controllers/friend-controller';

const friendsRoutes = Router();
const friendController = new FriendController();

friendsRoutes.post('/', friendController.create);

export { friendsRoutes };
