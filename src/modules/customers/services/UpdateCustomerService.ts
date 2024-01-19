import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
   id: string;
   name: string;
   email: string;
}

export default class UpdateCustomerService {
   public async execute({ id, name, email }: IRequest): Promise<Customer> {
      const customer = await CustomersRepository.findById(id);

      if (!customer) {
         throw new AppError('Cliente não encontrado.', 404);
      }

      if (customer.email !== email) {
         const customerEmailExist =
            await CustomersRepository.findByEmail(email);

         if (customerEmailExist) {
            throw new AppError('Já existe um cliente com este e-mail.');
         }
      }

      customer.name = name;
      customer.email = email;

      await CustomersRepository.save(customer);

      return customer;
   }
}
