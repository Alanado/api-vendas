import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
   public async show(req: Request, res: Response): Promise<Response> {
      const user_id = req.user.id;

      const showProfile = new ShowProfileService();

      const profile = await showProfile.execute({ user_id });

      const { password, ...infoProfile } = profile;

      return res.json(infoProfile);
   }

   public async update(req: Request, res: Response): Promise<Response> {
      const { name, email, password, old_password } = req.body;
      const user_id = req.user.id;

      const updateProfile = new UpdateProfileService();

      const profile = await updateProfile.execute({
         user_id,
         name,
         email,
         password,
         old_password,
      });

      const { password: _, ...infoProfile } = profile;

      return res.status(201).json(infoProfile);
   }
}
