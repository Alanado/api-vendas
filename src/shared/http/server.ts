import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { appDataSource } from '@shared/typeorm';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
   if (error instanceof AppError) {
      return res.status(error.statusCode).json({
         status: 'Error',
         message: error.message,
      });
   }

   console.log(error);

   return res.status(500).json({
      status: 'Error',
      message: 'Internal error',
   });
});

appDataSource
   .initialize()
   .then(() => {
      app.listen(3000, () => {
         console.log('Servidor rodando na porta 3000!');
      });
   })
   .catch(erro => {
      console.log(erro);
   });
