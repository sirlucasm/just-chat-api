import { Socket } from "socket.io";
import { io } from "../../../socket";
import MessageHandler from "./message-handler";
import UserHandler from "./user-handler";

const onConnection = (socket: Socket) => {
  MessageHandler(io, socket);
  UserHandler(io, socket);
}

export default onConnection;
