import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

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

      const user = UserRepository.create({
         name,
         email,
         password,
      });

      await UserRepository.save(user);

      return user;
   }
}
