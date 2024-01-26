import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomerController from '../controllers/CustomersController';
import authentication from '@shared/infra/http/middlewares/authentication';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.use(authentication);

customerRoutes.get('/', customerController.index);
customerRoutes.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do cliente para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   customerController.show,
);
customerRoutes.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required().messages({
            'any.required': 'O nome do cliente é obrigatório.',
            'string.empty': 'O nome do cliente é obrigatório.',
            'string.base': 'Insira um nome válido.',
         }),
         email: Joi.string().email().required().messages({
            'any.required': 'O email é obrigatório.',
            'string.empty': 'O email é obrigatório.',
            'string.base': 'Insira um email válido.',
            'string.email': 'Insira um email válido. ',
         }),
      },
   }),
   customerController.create,
);
customerRoutes.put(
   '/:id',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required().messages({
            'any.required': 'O nome do cliente é obrigatório.',
            'string.empty': 'O nome do cliente é obrigatório.',
            'string.base': 'Insira um nome válido.',
         }),
         email: Joi.string().email().required().messages({
            'any.required': 'O email é obrigatório.',
            'string.empty': 'O email é obrigatório.',
            'string.base': 'Insira um email válido.',
            'string.email': 'Insira um email válido. ',
         }),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do cliente para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   customerController.update,
);
customerRoutes.delete(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do cliente para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   customerController.delete,
);

export default customerRoutes;
