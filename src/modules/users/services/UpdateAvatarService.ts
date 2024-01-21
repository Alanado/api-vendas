import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import { uploadConfig } from '@config/upload';
import fs from 'fs/promises';

interface IRequest {
   id: string;
   fileName: string;
}

export default class UpdateAvatarService {
   public async execute({ id, fileName }: IRequest): Promise<User> {
      if (!fileName) {
         throw new AppError('Sem imagem de avatar enviado.');
      }

      const user = (await UserRepository.findById(id)) as User;

      if (user.avatar) {
         const avatarFilePath = path.join(uploadConfig.directory, user.avatar);

         const avatarFilePathExist = await fs.stat(avatarFilePath);

         if (avatarFilePathExist) {
            await fs.unlink(avatarFilePath);
         }
      }

      user.avatar = fileName;

      await UserRepository.save(user);

      return user;
   }
}
