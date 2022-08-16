import { Router } from 'express';
import { RoomController } from '../app/controllers/room-controller';
import { userAuthentication } from '../app/middlewares/user-authentication';

const roomsRoutes = Router();
const roomController = new RoomController();

roomsRoutes.post('/', userAuthentication, roomController.create);
roomsRoutes.get('/:roomId/join', userAuthentication, roomController.joinRoom);

export { roomsRoutes };
