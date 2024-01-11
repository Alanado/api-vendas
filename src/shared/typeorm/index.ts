import { DataSource } from 'typeorm';
import { CreateProducts1704932047720 } from '@shared/typeorm/migrations/1704932047720-CreateProducts';

export const appDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'api_vendas',
   migrations: [CreateProducts1704932047720],
});
