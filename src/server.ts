import chalk from 'chalk';
import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(chalk`\n{green ⚡ Listening on port ${PORT}}\n`));
