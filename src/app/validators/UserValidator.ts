import Validator from './Validator';
import { body } from 'express-validator';

export default Validator([
	body('email').isEmail().withMessage('Is not email'),
	body('name').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
]);
