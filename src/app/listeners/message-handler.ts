import { Server, Socket } from "socket.io";

const MessageHandler = (io: Server, socket: Socket) => {
  const joinChat = (payload: any) => {
    socket.join(payload.chatId);
  }

  const sendPrivateChatMessage = (payload: any) => {
    const { message, chatId } = payload;
    io.to(chatId).emit("message:chat:message", message);
  }

  const sendGeneralChatMessage = (payload: any) => {
    console.log(payload);
  }

  socket.on("message:chat:general:send", sendGeneralChatMessage);
  socket.on("message:chat:join", joinChat);
  socket.on("message:chat:message", sendPrivateChatMessage);

};

export default MessageHandler;
