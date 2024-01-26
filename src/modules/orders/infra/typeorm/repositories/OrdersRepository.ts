import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '../entities/Order';
import { appDataSource } from '@shared/infra/typeorm';

interface IProducts {
   product_id: string;
   price: number;
   quantity: number;
}

interface IRequest {
   customer: Customer;
   products: IProducts[];
}

const OrderRepository = appDataSource.getRepository(Order).extend({
   async findById(id: string): Promise<Order[] | null> {
      const order = this.find({
         where: { id },
         relations: ['order_products', 'customer'],
      });

      return order;
   },
   async createOrder({ customer, products }: IRequest): Promise<Order> {
      const order = this.create({
         customer,
         order_products: products,
      });

      await this.save(order);

      return order;
   },
});

export default OrderRepository;
