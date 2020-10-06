import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APP_KEY_JWT } from '../../config/config';

export default (req: Request, res: Response, next: NextFunction) => {
	if (req.path !== '/auth/login') {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ')[1];

			jwt.verify(token, `${APP_KEY_JWT}`, function (error, decoded) {
				if (error) {
					return res.status(403).send([
						{
							errors: {
								status: 500,
								title: 'Error',
								details: 'Server error',
							},
						},
					]);
				}

				if (req.method === 'POST') {
					next();
				} else {
					res.status(403).send([
						{
							errors: {
								status: 403,
								title: 'Forbidden',
								details: 'Not authorized',
							},
						},
					]);
				}
			});
		} else {
			res.status(403).send([
				{
					errors: {
						status: 403,
						title: 'Forbidden',
						details: 'Not authorized',
					},
				},
			]);
		}
	} else {
		next();
	}
};
