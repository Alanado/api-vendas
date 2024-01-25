import AppError from '@shared/errors/AppError';
import aws, { Endpoint, S3 } from 'aws-sdk';
import mime from 'mime';

interface ISaveFile {
   buffer?: Buffer;
   mimeType?: string;
}

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

   public async saveFile({ buffer, mimeType }: ISaveFile): Promise<string> {
      const type = mime.extension(mimeType as string);

      const conditions = ['jpg', 'jpeg', 'png'];

      if (!conditions.includes(type as string)) {
         new AppError('O campo avatar só aceita imagens(jpg, png, jpeg).', 409);
      }
      const upload = await this.client
         .upload({
            Bucket: String(process.env.KEY_NAME),
            Key: `${Date.now()}.${type}`,
            ContentType: mimeType,
            Body: buffer,
            ACL: 'public-read',
         })
         .promise();

      return upload.Key;
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
