import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class UserAvatarController {
   public async update(req: Request, res: Response): Promise<Response> {
      const userAvatar = new UpdateAvatarService();

      const avatar = await userAvatar.execute({
         id: req.user.id,
         file: req.file?.filename,
         buffer: req.file?.buffer,
         mimeType: req.file?.mimetype,
      });

      return res.status(201).json(instanceToInstance(avatar));
   }
}
