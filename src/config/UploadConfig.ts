import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';
import mime from 'mime';
import AppError from '@shared/errors/AppError';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

class UploadConfig {
   readonly directory: string = uploadFolder;
   readonly driver: 'disk' | 'backblaze' = process.env.STORAGE_DRIVER as
      | 'disk'
      | 'backblaze';

   private storage(): StorageEngine {
      return multer.diskStorage({
         destination: this.directory,
         filename(req, file, callback) {
            const type = mime.extension(file.mimetype);

            callback(null, `${Date.now()}.${type}`);
         },
      });
   }

   private fileFilter() {
      return (
         req: Request,
         file: Express.Multer.File,
         callback: multer.FileFilterCallback,
      ) => {
         const type = mime.extension(file.mimetype) as string;

         const conditions = ['jpg', 'png', 'jpeg'];

         if (!conditions.includes(type)) {
            callback(
               new AppError(
                  'O campo avatar só aceita imagens(jpg, png, jpeg).',
                  409,
               ) as unknown as Error,
            );
         }

         callback(null, true);
      };
   }

   get multerConfig(): multer.Options | undefined {
      if (this.driver === 'backblaze') {
         return undefined;
      }

      return {
         storage: this.storage(),
         fileFilter: this.fileFilter(),
      };
   }
}

export const uploadConfig = new UploadConfig();
