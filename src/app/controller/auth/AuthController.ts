import Reply from '../../helpers/Reply';
import { Request, Response } from 'express';
import { encryptTo, matchEncryptTo, signJWT } from '../../helpers/helper';

export default class AuthController {
	static async login(req: Request, res: Response) {
		try {
			let user: any = {};

			if (await matchEncryptTo(req.body.password, user.password)) {
				let token = signJWT(user);

				return Reply.status(200).success('Login success', {
					token,
				});
			} else {
				return Reply.status(403).badRequest(
					'Forbidden',
					'Password incorrect'
				);
			}
		} catch (error) {
			return Reply.status(404).badRequest(
				'User not found',
				'Email does not exist'
			);
		}
	}

	static async created(req: Request, res: Response) {
		try {
			let user: any = {};
			return Reply.status(201).success('User created', user);
		} catch (error) {
			return Reply.status(404).badRequest('User exists', 'Email exist');
		}
	}

	static async update(req: Request, res: Response) {
		try {
			let user: any = {};
			if (user) {
				return Reply.status(200).success('User update', user);
			}
		} catch (error) {
			return Reply.status(400).badRequest('Data incorrect', 'Email exists');
		}
	}
}
