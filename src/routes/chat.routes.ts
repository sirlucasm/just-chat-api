import { Router } from 'express';
import { ChatController } from '../app/controllers/chat-controller';
import { userAuthentication } from '../app/middlewares/user-authentication';

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.get('/', userAuthentication, chatController.listChats);

export { chatRoutes };
