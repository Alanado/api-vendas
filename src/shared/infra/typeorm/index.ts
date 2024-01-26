import { DataSource } from 'typeorm';
import { CreateProducts1704932047720 } from './migrations/1704932047720-CreateProducts';
import { CreateUser1705062556276 } from './migrations/1705062556276-createUser';
import { CreateUserTokens1705520807828 } from './migrations/1705520807828-CreateUserTokens';
import { CreateCustomers1705666680907 } from './migrations/1705666680907-CreateCustomers';
import { CreateOrders1705701647467 } from './migrations/1705701647467-CreateOrders';
import { AddCustomerIdToOrders1705702254717 } from './migrations/1705702254717-AddCustomerIdToOrders';
import { CreateOrdersProducts1705703420307 } from './migrations/1705703420307-CreateOrdersProducts';
import { AddProductIdToOrdersProducts1705703854107 } from './migrations/1705703854107-AddProductIdToOrdersProducts';
import { AddOrderIdToOrdersProducts1705703656614 } from './migrations/1705703656614-AddOrderIdToOrdersProducts';

import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export const appDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'api_vendas',
   entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
   migrations: [
      CreateProducts1704932047720,
      CreateUser1705062556276,
      CreateUserTokens1705520807828,
      CreateCustomers1705666680907,
      CreateOrders1705701647467,
      AddCustomerIdToOrders1705702254717,
      CreateOrdersProducts1705703420307,
      AddProductIdToOrdersProducts1705703854107,
      AddOrderIdToOrdersProducts1705703656614,
   ],
});
