import { uploadConfig } from '@config/upload';
import AppError from '@shared/errors/AppError';
import aws, { Endpoint, S3 } from 'aws-sdk';
import fs from 'fs/promises';
import mime from 'mime';
import path from 'path';
import { Z_BUF_ERROR } from 'zlib';

export default class S3StorageProvider {
   private client: S3;
   private endpoint: Endpoint;

   constructor() {
      this.endpoint = new aws.Endpoint(String(process.env.ENDPOINT_S3));
      this.client = new aws.S3({
         endpoint: this.endpoint,
         credentials: {
            accessKeyId: String(process.env.KEY_ID),
            secretAccessKey: String(process.env.APP_KEY),
         },
      });
   }

   public async saveFile(file: string): Promise<string> {
      const filePath = path.resolve(uploadConfig.temp, file);

      const type = mime.extension(filePath);

      if (!type) {
         new AppError('Arquivo não encontrado.');
      }

      const contentFile = await fs.readFile(filePath);

      const upload = await this.client
         .upload({
            Bucket: String(process.env.KEY_NAME),
            Key: file,
            ContentType: type,
            Body: contentFile,
         })
         .promise();

      await fs.unlink(filePath);

      return file;
   }

   public async deleteFile(file: string): Promise<void> {
      await this.client
         .deleteObject({
            Bucket: String(process.env.KEY_NAME),
            Key: file,
         })
         .promise();
   }
}
