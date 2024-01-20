import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersController {
   public async show(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;

      const showOrder = new ShowOrderService();

      const order = await showOrder.execute({ id });

      return res.json(order[0]);
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const { customer_id, products } = req.body;

      const createOrder = new CreateOrderService();

      const order = await createOrder.execute({
         customer_id,
         products,
      });

      return res.status(201).json(order);
   }
}
