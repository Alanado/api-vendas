import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
   name: string;
   email: string;
}

export default class CreateCustomerService {
   public async execute({ name, email }: IRequest): Promise<Customer> {
      const CustomerExist = await CustomersRepository.findByEmail(email);

      if (CustomerExist) {
         throw new AppError('Já existe um cliente com este e-mail.');
      }

      const customer = CustomersRepository.create({
         name,
         email,
      });

      await CustomersRepository.save(customer);

      return customer;
   }
}
