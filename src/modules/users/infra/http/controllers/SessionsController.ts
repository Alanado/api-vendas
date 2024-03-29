import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

export default class SessionsController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.body;

      const createSession = new CreateSessionsService();

      const sessionUser = await createSession.execute({ email, password });

      return res.status(200).json(instanceToInstance(sessionUser));
   }
}
