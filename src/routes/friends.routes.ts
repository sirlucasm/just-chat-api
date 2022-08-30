import { Router } from 'express';
import { FriendController } from '../app/controllers/friend-controller';
import { userAuthentication } from '../app/middlewares/user-authentication';

const friendsRoutes = Router();
const friendController = new FriendController();

friendsRoutes.post('/', userAuthentication, friendController.sendFriendRequest);
friendsRoutes.get('/', userAuthentication, friendController.listFriends);
friendsRoutes.get('/requests/sended', userAuthentication, friendController.listFriendRequestsSendedByMe);
friendsRoutes.get('/requests/received', userAuthentication, friendController.listFriendRequestsReceived);
friendsRoutes.post('/requests/accept', userAuthentication, friendController.acceptFriendRequest);
friendsRoutes.delete('/requests/refuse/:friendId', userAuthentication, friendController.refuseFriendRequest);

export { friendsRoutes };
