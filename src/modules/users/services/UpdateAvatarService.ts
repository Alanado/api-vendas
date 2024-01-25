import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { uploadConfig } from '@config/UploadConfig';
import S3StorageProvider from '@shared/providers/storage/S3StorageProvider';
import path from 'path';
import fs from 'fs/promises';

interface IRequest {
   id: string;
   buffer?: Buffer;
   mimeType?: string;
   file?: string;
}

export default class UpdateAvatarService {
   public async execute({
      id,
      buffer,
      mimeType,
      file,
   }: IRequest): Promise<User> {
      const user = (await UserRepository.findById(id)) as User;

      if (uploadConfig.driver === 'backblaze') {
         const s3Storage = new S3StorageProvider();

         if (user.avatar) {
            await s3Storage.deleteFile(user.avatar);
         }

         const filename = await s3Storage.saveFile({ buffer, mimeType });

         user.avatar = filename;
      }

      if (uploadConfig.driver === 'disk') {
         if (user.avatar) {
            const avatarFilePath = path.join(
               uploadConfig.directory,
               user.avatar,
            );

            const avatarFilePathExist = await fs.stat(avatarFilePath);

            if (avatarFilePathExist) {
               await fs.unlink(avatarFilePath);
            }
         }

         user.avatar = file as string;
      }

      await UserRepository.save(user);

      return user;
   }
}
