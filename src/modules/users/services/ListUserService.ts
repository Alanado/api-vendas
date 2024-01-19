import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

export default class ListUserService {
   public async execute(): Promise<User[]> {
      const users = await UserRepository.find();

      return users;
   }
}
