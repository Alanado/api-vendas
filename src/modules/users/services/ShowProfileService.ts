import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
   user_id: string;
}

export default class ShowProfileService {
   public async execute({ user_id }: IRequest): Promise<User> {
      const user = await UserRepository.findById(user_id);

      return user as User;
   }
}
