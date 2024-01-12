import Product from '../entities/Product';
import { appDataSource } from '@shared/typeorm/index';

const ProductRepository = appDataSource.getRepository(Product).extend({
   async findByName(name: string): Promise<Product | null> {
      const product = this.findOne({
         where: {
            name,
         },
      });

      return product;
   },
});

export default ProductRepository;
