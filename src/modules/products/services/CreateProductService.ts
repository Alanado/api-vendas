import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
   name: string;
   price: number;
   quantity: number;
}

export default class CreateProductService {
   public async execute({ name, price, quantity }: IRequest): Promise<Product> {
      const productExist = await ProductRepository.findByName(name);

      if (productExist) {
         throw new AppError('Já existe um produto com este nome.');
      }

      const product = ProductRepository.create({
         name,
         price,
         quantity,
      });

      await ProductRepository.save(product);

      return product;
   }
}
