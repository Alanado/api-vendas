import { appDataSource } from '@shared/infra/typeorm';
import User from '../entities/User';

const UserRepository = appDataSource.getRepository(User).extend({
   async findByName(name: string): Promise<User | null> {
      const user = await this.findOne({ where: { name } });

      return user;
   },
   async findById(id: string): Promise<User | null> {
      const user = await this.findOne({ where: { id } });

      return user;
   },
   async findByEmail(email: string): Promise<User | null> {
      const user = await this.findOne({ where: { email } });

      return user;
   },
});

export default UserRepository;
