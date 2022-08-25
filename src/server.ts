import chalk from 'chalk';
import { server } from './socket';

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(chalk`\n{green ⚡ [SERVER] Listening on port ${PORT}}\n`));
