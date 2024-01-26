import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
   user_id: string;
   name: string;
   email: string;
   password?: string;
   old_password?: string;
}

export default class UpdateProfileService {
   public async execute({
      name,
      user_id,
      email,
      password,
      old_password,
   }: IRequest): Promise<User> {
      const user = await UserRepository.findById(user_id);

      if (!user) {
         throw new AppError('Usuário não encontrado.');
      }

      if (user.email !== email) {
         const userExist = await UserRepository.findByEmail(email);

         if (userExist) {
            throw new AppError('E-mail já utilizado.');
         }
      }

      if (password) {
         if (!old_password) {
            throw new AppError('Insira sua senha antiga.');
         }

         const comparePassword = await compare(old_password, user.password);

         if (!comparePassword) {
            throw new AppError('Senha antiga não correspondente.');
         }

         user.password = await hash(password, 8);
      }

      (user.name = name), (user.email = email), await UserRepository.save(user);

      return user;
   }
}
