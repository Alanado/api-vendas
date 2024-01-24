import { uploadConfig } from '@config/upload';
import fs from 'fs/promises';
import path from 'path';

export default class DiskStorageProvider {
   public async saveFile(file: string): Promise<string> {
      await fs.rename(
         path.resolve(uploadConfig.temp, file),
         path.resolve(uploadConfig.directory, file),
      );

      return file;
   }

   public async deleteFile(file: string): Promise<void> {
      const filePath = path.resolve(uploadConfig.directory, file);

      try {
         await fs.stat(filePath);
      } catch {
         return;
      }

      await fs.unlink(filePath);
   }
}
