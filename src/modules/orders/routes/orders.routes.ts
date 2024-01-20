import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrdersController from '../controllers/OrdersController';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required().messages({
            'any.required': 'Informe o id do produto para realizar a busca.',
            'string.guid': 'O id informado não é válido.',
         }),
      },
   }),
   ordersController.show,
);
ordersRoutes.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         customer_id: Joi.string().uuid().required().messages({
            'any.required': 'O id do cliente é obrigatório.',
            'string.empty': 'O id do cliente é obrigatório.',
            'string.base': 'O id informado não é válido.',
            'string.guid': 'O id informado não é válido.',
         }),
         products: Joi.array()
            .required()
            .items(
               Joi.object({
                  id: Joi.string().uuid().required().messages({
                     'any.required':
                        'Informe o id do produto para realizar a busca.',
                     'string.guid': 'O id informado não é válido.',
                  }),
                  quantity: Joi.number().required().positive().messages({
                     'any.required': 'A quantidade do produto é obrigatório.',
                     'number.base':
                        'A quantidade do produto deve ser um valor numérico.',
                     'number.positive': 'Quantidade informada inválida.',
                  }),
               }),
            )
            .has(
               Joi.object({
                  id: Joi.valid(),
                  quantity: Joi.valid(),
               }),
            )
            .messages({
               'any.required': 'O campo products é obrigatório.',
               'array.base': 'O campo products deve ser um array.',
               'array.hasUnknown':
                  'Insira as propriedades id e quantity dentro do array.',
               'object.base':
                  'O array deve conter objetos com as propriedades obrigatórias.',
               'object.unknown':
                  'Existe uma propriedade informada desconhecida',
            }),
      },
   }),
   ordersController.create,
);

export default ordersRoutes;
