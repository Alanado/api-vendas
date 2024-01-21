import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwt from '@config/jwtAuth';
import User from '../typeorm/entities/User';

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: User;
   token: string;
}

export default class CreateSessionsService {
   public async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await UserRepository.findByEmail(email);

      if (!user) {
         throw new AppError('E-mail ou senha incorretos.', 401);
      }

      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
         throw new AppError('E-mail ou senha incorretos.', 401);
      }

      const tokenAuthentication = sign({}, jwt.secret, {
         subject: user.id,
         expiresIn: jwt.expiresIn,
      });

      return {
         user,
         token: tokenAuthentication,
      };
   }
}
