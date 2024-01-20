import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
   id: string;
}

export default class ShowOrderService {
   public async execute({ id }: IRequest): Promise<Order[]> {
      const order = await OrderRepository.findById(id);

      if (!order) {
         throw new AppError('Pedido não encontrado.');
      }

      return order;
   }
}
