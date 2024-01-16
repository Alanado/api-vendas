import { Router } from 'express';
import productRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
