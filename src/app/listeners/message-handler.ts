import { Server, Socket } from "socket.io";

const MessageHandler = (io: Server, socket: Socket) => {
  const sendMessage = (payload: any) => {
    console.log(payload)
  }

  socket.on("message:send", sendMessage);
};

export default MessageHandler;
