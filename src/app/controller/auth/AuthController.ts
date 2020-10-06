import { getRepository } from 'typeorm';
import User from '../../../database/models/User';
import Reply from '../../helpers/Reply';
import { Request, Response } from 'express';
import { encryptTo, matchEncryptTo, signJWT } from '../../helpers/helper';

export default class AuthController {
	static async login(req: Request, res: Response) {
		try {
			let user = await getRepository(User).findOneOrFail({
				where: { email: req.body.email },
			});

			if (await matchEncryptTo(req.body.password, user.password)) {
				let token = signJWT({ id: user.id, email: user.email });

				Reply.success(200, 'Login success', {
					token,
				});
			} else {
				Reply.badRequest(403, 'Forbidden', 'Password incorrect');
			}
		} catch (error) {
			Reply.badRequest(404, 'User not found', 'Email does not exist');
		}

		return res.status(Reply.code).json(Reply.data);
	}

	static async store(req: Request, res: Response) {
		let user = getRepository(User).create({
			name: req.body.name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: await encryptTo(req.body.password),
		});

		try {
			let result = await getRepository(User).save(user);
			Reply.success(201, 'User created', result);
		} catch (error) {
			Reply.badRequest(404, 'User exists', 'Email exist');
		}

		return res.status(Reply.code).json(Reply.data);
	}

	static async update(req: Request, res: Response) {
		let user = getRepository(User).findOneOrFail({
			where: { id: req.body.token.id },
		});

		return res.json(user);
	}
}
