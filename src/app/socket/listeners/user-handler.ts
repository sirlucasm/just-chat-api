import { Server, Socket } from "socket.io";
import { getCurrentChatInfo } from "../../../utils/chat";
import { UserSocket } from "../classes/User";

const userSocket = new UserSocket();
const { onlineUsers } = userSocket;

const UserHandler = (io: Server, socket: Socket) => {
  const online = (user: any) => {
    if (onlineUsers.includes(user._id)) io.emit('user:onlineList', onlineUsers);
    onlineUsers.push(user._id);

    socket.on('disconnect', () => {
      onlineUsers.splice(onlineUsers.indexOf(user._id), 1);
    });

    io.emit('user:onlineList', onlineUsers);
  }

  socket.on("user:onlineList", online);
};

export default UserHandler;
