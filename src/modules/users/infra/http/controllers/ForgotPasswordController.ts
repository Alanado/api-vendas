import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';
import { Request, Response } from 'express';

export default class ForgotPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { email } = req.body;

      const sendForgotPassword = new SendForgotPasswordService();

      await sendForgotPassword.execute({ email });

      return res.status(204).json();
   }
}
