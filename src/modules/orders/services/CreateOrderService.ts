import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import OrderRepository from '../typeorm/repositories/OrdersRepository';
import Product from '@modules/products/typeorm/entities/Product';

interface IProduct {
   id: string;
   quantity: number;
}

interface IRequest {
   customer_id: string;
   products: IProduct[];
}

export default class CreateUserService {
   public async execute({ customer_id, products }: IRequest): Promise<Order> {
      const customerExist = await CustomersRepository.findById(customer_id);

      if (!customerExist) {
         throw new AppError('Não foi encontrado nenhum cliente com esse id.');
      }

      const priceProducts: {
         product_id: string;
         price: number;
      }[] = [];

      for (let product of products) {
         const productExist = await ProductRepository.findById(product.id);

         if (!productExist) {
            throw new AppError(
               `Não foi encontrado nenhum produto com este id: ${product.id}. `,
            );
         }

         if (product.quantity > productExist.quantity) {
            throw new AppError(
               `Não tem estoque disponível para o produto de id: ${product.id}.
               Estoque disponível: ${productExist.quantity}`,
            );
         }

         priceProducts.push({
            product_id: product.id,
            price: productExist.price,
         });
      }

      const productsOrder = products.map(product => ({
         product_id: product.id,
         quantity: product.quantity,
         price: priceProducts.filter(prod => prod.product_id === product.id)[0]
            .price,
      }));

      const order = await OrderRepository.createOrder({
         customer: customerExist,
         products: productsOrder,
      });

      const { order_products } = order;

      for (let productInfo of order_products) {
         const product = (await ProductRepository.findById(
            productInfo.product_id,
         )) as Product;

         product.quantity -= productInfo.quantity;

         await ProductRepository.save(product);
      }
      return order;
   }
}
