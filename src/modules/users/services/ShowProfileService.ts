import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequest {
   user_id: string;
}

export default class ShowProfileService {
   public async execute({ user_id }: IRequest): Promise<User> {
      const user = await UserRepository.findById(user_id);

      return user as User;
   }
}
