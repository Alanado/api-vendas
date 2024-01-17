import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
   token: string;
   password: string;
}

export default class ResetPasswordService {
   public async execute({ token, password }: IRequest): Promise<void> {
      const userToken = await UserTokensRepository.findByToken(token);

      if (!userToken) {
         throw new AppError('Token de recuperação de senha inexistente');
      }

      const user = await UserRepository.findById(userToken.user_id);

      if (!user) {
         throw new AppError(
            'Nenhum usuário relacionado a este token foi encontrado.',
         );
      }

      const tokenCreatedAt = userToken.created_at;
      const compareDates = addHours(tokenCreatedAt, 2);

      if (isAfter(Date.now(), compareDates)) {
         throw new AppError('Token de recuperação de senha expirado.');
      }

      user.password = await hash(password, 8);
   }
}
