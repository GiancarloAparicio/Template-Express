import { Router } from 'express';
import ApiController from '../app/controller/ApiController';
import multer from '../config/multer';
import UserValidator from '../app/validators/UserValidator';

const api = Router();

api.get('/', ApiController.index);
api.post('/', multer.single('file'), ...UserValidator, ApiController.store);
api.get('/:id', ApiController.show);
api.put('/:id', ApiController.update);
api.delete('/:id', ApiController.destroy);

export default api;
