import AppError from '@shared/errors/AppError';
import OrderRepository from '../infra/typeorm/repositories/OrdersRepository';
import Order from '../infra/typeorm/entities/Order';

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
