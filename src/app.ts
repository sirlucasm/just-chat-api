import './database';
import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './errors/AppErrors';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({
    message: `Internal server error - ${err.message}}`,
    status: 'error',
  });
});

export default app;
