import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomersService {
   public async execute(): Promise<Customer[]> {
      const customers = await CustomersRepository.find();

      return customers;
   }
}
