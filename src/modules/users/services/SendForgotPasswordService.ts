import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
   email: string;
}

export default class SendForgotPasswordService {
   public async execute({ email }: IRequest): Promise<void> {
      const user = await UserRepository.findByEmail(email);

      if (!user) {
         throw new AppError(
            'Não existe nenhum usuário com este e-mail em nosso sistema.',
         );
      }

      const token = await UserTokensRepository.generate(user.id);

      console.log(token);
   }
}