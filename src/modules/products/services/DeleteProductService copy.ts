import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

export default class DeleteProductService {
   public async execute(id: string): Promise<void> {
      const product = await ProductRepository.findOne({ where: { id } });

      if (!product) {
         throw new AppError('Produto não encontrado.', 404);
      }

      await ProductRepository.remove(product);
   }
}
