import { appDataSource } from '@shared/infra/typeorm';
import Product from '../entities/Product';

const ProductRepository = appDataSource.getRepository(Product).extend({
   async findByName(name: string): Promise<Product | null> {
      const product = this.findOne({
         where: {
            name,
         },
      });

      return product;
   },
   async findById(id: string): Promise<Product | null> {
      const product = this.findOne({
         where: {
            id,
         },
      });

      return product;
   },
});

export default ProductRepository;
