import { Router } from 'express';

import customerRoutes from '@modules/customers/infra/http/routes/customers.routes';
import ordersRoutes from '@modules/orders/infra/http/routes/orders.routes';
import productRoutes from '@modules/products/infra/http/routes/products.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/customers', customerRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
