import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

export default class ListCustomersService {
   public async execute(): Promise<Customer[]> {
      const customers = await CustomersRepository.find();

      return customers;
   }
}
