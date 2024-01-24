import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { uploadConfig } from '@config/upload';
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';

interface IRequest {
   id: string;
   file: string;
}

export default class UpdateAvatarService {
   public async execute({ id, file }: IRequest): Promise<User> {
      if (!file) {
         throw new AppError('Sem imagem de avatar enviado.');
      }

      const storageProvider = new DiskStorageProvider();

      const user = (await UserRepository.findById(id)) as User;

      if (user.avatar) {
         await storageProvider.deleteFile(user.avatar);
      }

      const filename = await storageProvider.saveFile(file);

      user.avatar = filename;

      await UserRepository.save(user);

      return user;
   }
}
