import { Server, Socket } from "socket.io";
import { Message } from "../../schemas/message";

const MessageHandler = (io: Server, socket: Socket) => {
  const joinOnChats = (chats: any[]) => {
    chats.forEach(chat => socket.join(chat._id));
  }

  const sendPrivateChatMessage = async (payload: any) => {
    const { textMessage, chat, userId } = payload;
    const chatId = chat._id;
    const newMessage = await Message.create({
      text: textMessage,
      user: userId,
      chat
    });
    const message = await Message.findOne({ _id: newMessage._id }).populate('user');
    io.to(chatId).emit("message:chat:message", message);
  }

  const getChatAllMessages = async (payload: any) => {
    const { chatId } = payload;
    const messages = await Message.find({ 'chat._id': chatId }).populate('user');

    socket.emit("message:chat:allMessages", messages);
  }

  const sendGeneralChatMessage = (payload: any) => {
    console.log(payload);
  }

  socket.on("message:chat:join", joinOnChats);
  socket.on("message:chat:message", sendPrivateChatMessage);
  socket.on("message:chat:allMessages", getChatAllMessages);
  socket.on("message:chat:general:send", sendGeneralChatMessage);

};

export default MessageHandler;
