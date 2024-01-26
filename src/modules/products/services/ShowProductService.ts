import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';

export default class ShowProductService {
   public async execute(id: string): Promise<Product> {
      const product = await ProductRepository.findOne({ where: { id } });

      if (!product) {
         throw new AppError('Produto não encontrado.', 404);
      }

      return product;
   }
}
