import { DataSource } from 'typeorm';
import { CreateProducts1704932047720 } from '@shared/typeorm/migrations/1704932047720-CreateProducts';
import { CreateUser1705062556276 } from '@shared/typeorm/migrations/1705062556276-createUser';
import Product from '@modules/products/typeorm/entities/Product';

export const appDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'api_vendas',
   entities: [Product],
   migrations: [CreateProducts1704932047720, CreateUser1705062556276],
});
