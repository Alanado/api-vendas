import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

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

passwordRoutes.post(
   '/reset',
   celebrate({
      [Segments.BODY]: {
         token: Joi.string().uuid().required().messages({
            'any.required': 'O token para recuperação de senha é obrigatório.',
            'string.empty': 'O token para recuperação de senha é obrigatório.',
            'string.base': 'Insira um token de recuperação de senha válido.',
            'string.guid':
               'O token de recuperação de senha deve ser do tipo uuid.',
         }),
         password: Joi.string().required().messages({
            'any.required': 'A senha é obrigatório.',
            'string.empty': 'A senha é obrigatório.',
            'string.base': 'Insira uma senha válida.',
         }),
         password_confirmation: Joi.string()
            .required()
            .valid(Joi.ref('password'))
            .messages({
               'any.only': 'As duas senhas devem ser iguais.',
               'any.required': 'Repita a senha que acabou de criar.',
               'string.empty': 'Repita a senha que acabou de criar.',
               'string.base': 'As duas senhas devem ser iguais.',
            }),
      },
   }),
   resetPasswordController.create,
);

export default passwordRoutes;
