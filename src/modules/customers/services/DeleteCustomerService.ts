import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
   id: string;
}

export default class DeleteCustomerService {
   public async execute({ id }: IRequest): Promise<void> {
      const customer = await CustomersRepository.findById(id);

      if (!customer) {
         throw new AppError('Cliente não encontrado.', 404);
      }

      await CustomersRepository.remove(customer);
   }
}
