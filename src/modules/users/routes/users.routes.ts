import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UsersController';
import authentication from '@shared/http/middlewares/authentication';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
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
         password: Joi.string().required().messages({
            'any.required': 'A senha é obrigatório.',
            'string.empty': 'A senha é obrigatório.',
            'string.base': 'Insira uma senha válida.',
         }),
      },
   }),
   userController.create,
);

userRoutes.use(authentication);

userRoutes.get('/', userController.index);

export default userRoutes;
