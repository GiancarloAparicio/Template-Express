import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Reply from './Reply';

export default (rules: any) => [
	rules,
	(req: Request, res: Response, next: NextFunction) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			Reply.status(400).badRequest('Invalid', 'Invalid data');
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
