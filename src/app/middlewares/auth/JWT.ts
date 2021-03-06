import jwt from 'jsonwebtoken';
import Reply from '../../services/Reply';
import { APP_KEY_JWT } from '../../../config/config';
import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../../errors/exceptions/NotFoundException';
import AuthenticationException from '../../errors/exceptions/AuthenticationException';

export default (req: Request, res: Response, next: NextFunction) => {
	if (req.path !== '/auth/login' && req.path !== '/auth/create') {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ')[1];

			jwt.verify(token, `${APP_KEY_JWT}`, function (error, decoded) {
				if (error) {
					next(
						new AuthenticationException({
							title: 'Authentication',
							details: 'Forbidden',
						})
					);
				} else {
					req.body.decoded = decoded;
					Reply.response = res;
					Reply.next = next;
					Reply.request = req;
					next();
				}
			});
		}
	} else if (req.method == 'POST') {
		Reply.response = res;
		Reply.next = next;
		Reply.request = req;
		next();
	} else {
		next(new NotFoundException('Page not found'));
	}
};
