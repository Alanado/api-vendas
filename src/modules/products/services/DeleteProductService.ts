import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

export default class DeleteProductService {
   public async execute(id: string): Promise<void> {
      const product = await ProductRepository.findOne({ where: { id } });

      if (!product) {
         throw new AppError('Produto não encontrado.', 404);
      }

      const redisCache = new RedisCache();

      await redisCache.invalidate('list_products');

      await ProductRepository.remove(product);
   }
}
