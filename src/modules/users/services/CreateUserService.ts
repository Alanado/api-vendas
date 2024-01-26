import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

export default class CreateUserService {
   public async execute({ name, email, password }: IRequest): Promise<User> {
      const userExist = await UserRepository.findByEmail(email);

      if (userExist) {
         throw new AppError('E-mail já utilizado.');
      }

      const hashedPassword = await hash(password, 8);

      const user = UserRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      await UserRepository.save(user);

      return user;
   }
}
