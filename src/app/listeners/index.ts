import { Socket } from "socket.io";
import { io } from "../../socket";
import MessageHandler from "./message-handler";

const onConnection = (socket: Socket) => {
  MessageHandler(io, socket);
}

export default onConnection;
