import jwt from '@config/jwtAuth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default async function authentication(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> {
   const { authorization } = req.headers;

   if (!authorization) {
      throw new AppError('Sem token de autenticação.', 401);
   }

   const token = authorization.replace('Bearer ', '').trim();

   try {
      const session = verify(token, jwt.secret);

      next();
   } catch {
      throw new AppError('Token inválido ou mal formatado.');
   }
}
