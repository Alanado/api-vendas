import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
   id: string;
   name: string;
   price: number;
   quantity: number;
}

export default class UpdateProductService {
   public async execute({
      name,
      price,
      quantity,
      id,
   }: IRequest): Promise<Product> {
      const product = await ProductRepository.findOne({ where: { id } });

      if (!product) {
         throw new AppError('Produto não encontrado.', 404);
      }

      const productExist = await ProductRepository.findByName(name);

      if (productExist && name !== product.name) {
         throw new AppError('Já existe um produto com este nome.');
      }

      product.name = name;
      product.price = price;
      product.quantity = quantity;

      const redisCache = new RedisCache();

      await redisCache.invalidate('list_products');

      await ProductRepository.save(product);

      return product;
   }
}
