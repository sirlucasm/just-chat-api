import http from 'http';
import app from './app';
import onConnection from './app/socket/listeners';
import { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', onConnection);

export { server, io };
