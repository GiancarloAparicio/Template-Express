import Reply from '../../services/Reply';
import { Request, Response } from 'express';
import { encryptTo, matchEncryptTo } from '../../helpers/helper';
import { signJWT } from '../../helpers/JWT';

export default class AuthController {
	static async login(req: Request, res: Response) {
		let user = {
			//example
			password: 'someThing',
		};

		if (await matchEncryptTo(req.body.password, user.password)) {
			let token = signJWT(user);

			return Reply.status(200).success('Login success', {
				token,
			});
		}
		return Reply.status(403).badRequest(
			'Authentication failed',
			'Password incorrect'
		);
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
