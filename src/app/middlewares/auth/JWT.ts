import jwt from 'jsonwebtoken';
import { APP_KEY_JWT } from '../../../config/config';
import { Request, Response, NextFunction } from 'express';
import Reply from '../../helpers/Reply';

export default (req: Request, res: Response, next: NextFunction) => {
	if (req.path !== '/auth/login' && req.path !== '/auth/created') {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ')[1];

			jwt.verify(token, `${APP_KEY_JWT}`, function (error, decoded) {
				if (error) {
					return res.status(400).json({
						errors: [
							{
								status: 400,
								title: 'Forbidden',
								details: 'Not authorized',
							},
						],
					});
				}
				req.body.decoded = decoded;
				Reply.response = res;
				next();
			});
		} else {
			res.status(403).json({
				errors: [
					{
						status: 403,
						title: 'Forbidden',
						details: 'Not authorized',
					},
				],
			});
		}
	} else {
		Reply.response = res;
		next();
	}
};
