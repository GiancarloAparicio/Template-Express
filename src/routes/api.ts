import { Router } from 'express';
import ApiController from '../app/controller/ApiController';

const api = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */
api.get('/', ApiController.index);
api.post('/', ApiController.store);
api.get('/:id', ApiController.show);
api.put('/:id', ApiController.update);
api.delete('/:id', ApiController.destroy);

export default api;
