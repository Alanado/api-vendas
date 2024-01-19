import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import authentication from '@shared/http/middlewares/authentication';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(authentication);

profileRoutes.put(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required().messages({
            'any.required': 'O nome de usuário é obrigatório.',
            'string.empty': 'O nome de usuário é obrigatório.',
            'string.base': 'Insira um nome de usuário válido.',
         }),
         email: Joi.string().email().required().messages({
            'any.required': 'O email é obrigatório.',
            'string.empty': 'O email é obrigatório.',
            'string.base': 'Insira um email válido.',
            'string.email': 'Insira um email válido. E',
         }),
         password: Joi.string().optional().messages({
            'any.required': 'A senha é obrigatório.',
            'string.empty': 'A senha é obrigatório.',
            'string.base': 'Insira uma senha válida.',
         }),
         old_password: Joi.string().messages({
            'string.base': 'A senha antiga informada é válida.',
         }),
         password_confirmation: Joi.string()
            .valid(Joi.ref('password'))
            .when('password', { is: Joi.exist(), then: Joi.required() })
            .messages({
               'any.only': 'As duas senhas devem ser iguais.',
               'any.required': 'Repita a senha que acabou de criar.',
               'string.empty': 'Repita a senha que acabou de criar.',
               'string.base': 'As duas senhas devem ser iguais.',
            }),
      },
   }),
   profileController.update,
);

profileRoutes.get('/', profileController.show);

export default profileRoutes;
