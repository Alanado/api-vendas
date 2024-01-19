import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
   public async index(req: Request, res: Response): Promise<Response> {
      const listUser = new ListUserService();

      const usersInfo = await listUser.execute();

      const users = usersInfo.map(user => {
         return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
         };
      });

      return res.json(users);
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const { name, email, password } = req.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
         name,
         email,
         password,
      });

      const { password: _, ...userCreated } = user;

      return res.status(201).json(userCreated);
   }
}
