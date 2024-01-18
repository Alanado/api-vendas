import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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

      const { token } = await UserTokensRepository.generate(user.id);

      const forgotPasswordTemplate = path.resolve(
         __dirname,
         '..',
         'views',
         'forgotPassword.hbs',
      );

      EtherealMail.sendMail({
         to: {
            email: user.email,
            name: user.name,
         },
         subject: 'Redefinição de senha.',
         template: {
            file: forgotPasswordTemplate,
            variables: {
               name: user.name,
               link: `http://localhost:3000/password/reset?token=${token}`,
            },
         },
      });
   }
}
