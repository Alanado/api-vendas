import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
   id: string;
}

export default class ShowCustomerService {
   public async execute({ id }: IRequest): Promise<Customer> {
      const customer = await CustomersRepository.findById(id);

      if (!customer) {
         throw new AppError('Cliente não encontrado.', 404);
      }

      return customer;
   }
}
