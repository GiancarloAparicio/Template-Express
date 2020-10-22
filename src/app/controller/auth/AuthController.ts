import Reply from '../../services/Reply';
import { signJWT } from '../../helpers/JWT';
import { Request, Response } from 'express';
import User from '../../../database/models/User';
import UserRepository from '../../repositories/UserRepository';
import { encryptTo, matchEncryptTo, removeProperty } from '../../helpers/helper';

export default class AuthController {
	static async login(req: Request, res: Response) {
		let { email, password } = req.body;

		let user = await UserRepository.findOneOrFail({ email }, true);

		if (user) {
			if (await matchEncryptTo(password, user.password)) {
				return Reply.status(200).success('Login success', {
					token: signJWT(user),
					user: removeProperty(user, 'password'),
				});
			}
			return Reply.status(403).badRequest('Forbidden', 'Password incorrect');
		}
	}

	static async create(req: Request, res: Response) {
		let { validated } = req.body;

		let user = await UserRepository.create({
			...validated,
			password: await encryptTo(validated.password),
		});
		if (user) {
			return Reply.status(201).success('User created', {
				...user,
				token: signJWT(user),
			});
		}
	}

	static async update(req: Request, res: Response) {
		let { validated, decoded } = req.body;

		let user = await User.findByIdAndUpdate(decoded._id, validated);

		return Reply.status(200).success('Update success', {
			user,
		});
	}
}
