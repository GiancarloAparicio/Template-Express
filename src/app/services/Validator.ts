import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidationException from '../exceptions/errors/ValidationException';

export default (rules: any) => [
	rules,
	(req: Request, res: Response, next: NextFunction) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new ValidationException(errors.array()));
		} else {
			next();
		}
	},
];
