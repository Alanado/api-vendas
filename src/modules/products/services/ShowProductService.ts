import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class ShowProductService {
   public async execute(id: string): Promise<Product | null> {
      const product = await ProductRepository.findOne({ where: { id } });

      return product;
   }
}
