import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
   public async update(req: Request, res: Response): Promise<Response> {
      const userAvatar = new UpdateAvatarService();

      console.log(req.file);
      const avatar = await userAvatar.execute({
         id: req.user.id,
         file: req.file?.filename,
         buffer: req.file?.buffer,
         mimeType: req.file?.mimetype,
      });

      return res.status(201).json(instanceToInstance(avatar));
   }
}
