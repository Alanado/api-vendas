import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post(
   '/forgot',
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required().messages({
            'any.required': 'O email é obrigatório.',
            'string.empty': 'O email é obrigatório.',
            'string.base': 'Insira um email válido.',
            'string.email': 'Insira um email válido.',
         }),
      },
   }),
   forgotPasswordController.create,
);

export default passwordRoutes;
