import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ForgotPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { password, token } = req.body;

      const resetPassword = new ResetPasswordService();

      await resetPassword.execute({ token, password });

      return res.status(204).json();
   }
}
