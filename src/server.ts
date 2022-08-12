import chalk from 'chalk';
import app from './app';
import { server } from './socket';

const PORT = process.env.PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 3333;

server.listen(SOCKET_PORT, () => console.log(chalk`\n{green ⚡ [SOCKET] Listening on port ${SOCKET_PORT}}`));

app.listen(PORT, () => console.log(chalk`\n{green ⚡ [SERVER] Listening on port ${PORT}}\n`));
