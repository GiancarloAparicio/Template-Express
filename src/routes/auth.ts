import { Router } from 'express';
import AuthController from '../app/controller/AuthController';

const auth = Router();

auth.post('auth/login', AuthController.index);

export default auth;
