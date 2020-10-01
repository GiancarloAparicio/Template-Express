import { body, validationResult } from 'express-validator';

export default [
	body('username').isEmail(),
	// password must be at least 5 chars long
	body('password').isLength({ min: 5 }),
];
