import { Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
   public async update(req: Request, res: Response): Promise<Response> {
      const userAvatar = new UpdateAvatarService();

      const avatar = await userAvatar.execute({
         id: req.user.id,
         fileName: req.file?.filename as string,
      });

      return res.status(201).json(instanceToInstance(avatar));
   }
}
