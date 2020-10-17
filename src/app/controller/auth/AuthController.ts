import Reply from '../../services/Reply';
import { Request, Response, NextFunction } from 'express';
import { encryptTo, matchEncryptTo, signJWT } from '../../helpers/helper';

export default class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		let user = {
			//example
			password: 'someThing',
		};

		if (await matchEncryptTo(req.body.password, user.password)) {
			let token = signJWT(user);

			Reply.status(200).success('Login success', {
				token,
			});
		}
	}

	static async created(req: Request, res: Response) {
		let user: any = {};
		return Reply.status(201).success('User created', user);
	}

	static async update(req: Request, res: Response) {
		let user: any = {};
		if (user) {
			return Reply.status(200).success('User update', user);
		}
		return Reply.status(200).badRequest('Forbidden', 'Password incorrect');
	}
}
