import { Router } from 'express';
import AuthController from '../app/controller/auth/AuthController';
import UserValidator from '../app/validators/UserValidator';
import Login from '../app/validators/Login';

const auth = Router();

auth.post('/login', ...Login, AuthController.login);
auth.post('/created', ...UserValidator, AuthController.store);
auth.put('/update', ...UserValidator, AuthController.update);

export default auth;
