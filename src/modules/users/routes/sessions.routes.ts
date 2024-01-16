import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionRoutes = Router();
const createSessions = new SessionsController();

sessionRoutes.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required().messages({
            'any.required': 'O email é obrigatório.',
            'string.empty': 'O email é obrigatório.',
            'string.base': 'Insira um email válido.',
            'string.email': 'Insira um email válido. E',
         }),
         password: Joi.string().required().messages({
            'any.required': 'A senha é obrigatório.',
            'string.empty': 'A senha é obrigatório.',
            'string.base': 'Insira uma senha válida.',
         }),
      },
   }),
   createSessions.create,
);

export default sessionRoutes;
