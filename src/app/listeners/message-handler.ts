import { Server, Socket } from "socket.io";

const MessageHandler = (io: Server, socket: Socket) => {
  const joinPrivateChat = (payload: any) => {
    socket.join(payload.room);
  }

  const sendGeneralChatMessage = (payload: any) => {
    console.log(payload);
  }

  socket.on("message:chat:general:send", sendGeneralChatMessage);
  socket.on("message:chat:private:join", joinPrivateChat);
};

export default MessageHandler;
