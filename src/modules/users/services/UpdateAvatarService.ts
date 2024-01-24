import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { uploadConfig } from '@config/upload';
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/S3StorageProvider';

interface IRequest {
   id: string;
   file: string;
}

export default class UpdateAvatarService {
   public async execute({ id, file }: IRequest): Promise<User> {
      if (!file) {
         throw new AppError('Sem imagem de avatar enviado.');
      }

      const user = (await UserRepository.findById(id)) as User;

      if (uploadConfig.driver === 'backblaze') {
         const s3Storage = new S3StorageProvider();

         if (user.avatar) {
            await s3Storage.deleteFile(user.avatar);
         }

         const filename = await s3Storage.saveFile(file);

         user.avatar = filename;
      }

      if (uploadConfig.driver === 'disk') {
         const diskStorage = new DiskStorageProvider();

         if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
         }

         const filename = await diskStorage.saveFile(file);

         user.avatar = filename;
      }

      await UserRepository.save(user);

      return user;
   }
}
