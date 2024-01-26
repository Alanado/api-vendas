import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';

export default class ResetPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { password, token } = req.body;

      const resetPassword = new ResetPasswordService();

      await resetPassword.execute({ token, password });

      return res.status(204).json();
   }
}
