import RedisCache from '@shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

export default class ListProductService {
   public async execute(): Promise<Product[]> {
      const redisCache = new RedisCache();

      let products = await redisCache.recover<Product[]>('list_products');

      if (!products) {
         products = await ProductRepository.find();

         await redisCache.save('list_products', products);
      }

      return products;
   }
}
