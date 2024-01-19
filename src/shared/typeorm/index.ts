import { DataSource } from 'typeorm';
import { CreateProducts1704932047720 } from '@shared/typeorm/migrations/1704932047720-CreateProducts';
import { CreateUser1705062556276 } from '@shared/typeorm/migrations/1705062556276-createUser';
import { CreateUserTokens1705520807828 } from './migrations/1705520807828-CreateUserTokens';
import { CreateCustomers1705666680907 } from './migrations/1705666680907-CreateCustomers';
import { CreateOrders1705701647467 } from './migrations/1705701647467-CreateOrders';
import { AddCustomerIdToOrders1705702254717 } from './migrations/1705702254717-AddCustomerIdToOrders';

import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import Customer from '@modules/customers/typeorm/entities/Customer';

export const appDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'api_vendas',
   entities: [Product, User, UserToken, Customer],
   migrations: [
      CreateProducts1704932047720,
      CreateUser1705062556276,
      CreateUserTokens1705520807828,
      CreateCustomers1705666680907,
      CreateOrders1705701647467,
      AddCustomerIdToOrders1705702254717,
   ],
});
