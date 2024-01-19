import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';
import passwordRoutes from '@modules/users/routes/password.routes';
import profileRoutes from '@modules/users/routes/profile.routes';
import customerRoutes from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/customers', customerRoutes);

export default routes;
