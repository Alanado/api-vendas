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
productRoutes.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required().messages({
            'any.required': 'O nome do produto é obrigatório.',
            'string.empty': 'O nome do produto é obrigatório.',
            'string.base': 'Insira um nome de produto válido.',
         }),
         price: Joi.number().precision(2).required().positive().messages({
            'number.base': 'O preço deve ser um valor numérico.',
            'any.required': 'O preço do produto é obrigatório.',
            'number.integer': 'O formato do preço inserido é inválido.',
            'number.positive': 'Preço informado inválida.',
         }),
         quantity: Joi.number().required().positive().messages({
            'any.required': 'A quantidade do produto é obrigatório.',
            'number.base':
               'A quantidade do produto deve ser um valor numérico.',
            'number.positive': 'Quantidade informada inválida.',
         }),
      },
   }),
   productController.create,
);
productRoutes.put(
   '/:id',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required().messages({
            'any.required': 'O nome do produto é obrigatório.',
            'string.empty': 'O nome do produto é obrigatório.',
         }),
         price: Joi.number().precision(2).required().positive().messages({
            'number.base': 'O preço deve ser um valor numérico.',
            'any.required': 'O preço do produto é obrigatório.',
            'number.integer': 'O formato do preço inserido é inválido.',
            'number.positive': 'Preço informado inválida.',
         }),
         quantity: Joi.number().required().positive().messages({
            'any.required': 'A quantidade do produto é obrigatório.',
            'number.base':
               'A quantidade do produto deve ser um valor numérico.',
            'number.positive': 'Quantidade informada inválida.',
         }),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do produto para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   productController.update,
);
productRoutes.delete(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do produto para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   productController.delete,
);

export default productRoutes;
