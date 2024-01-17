import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwt from '@config/jwtAuth';

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      created_at: Date;
      updated_at: Date;
   };
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

      const { password: _, ...sessionUser } = user;

      return {
         user: sessionUser,
         token: tokenAuthentication,
      };
   }
}
