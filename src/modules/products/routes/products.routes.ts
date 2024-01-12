import ProductController from '../controllers/ProductsController';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);
productRoutes.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do produto para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   productController.show,
);
productRoutes.post('/', productController.create);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.delete);

export default productRoutes;
