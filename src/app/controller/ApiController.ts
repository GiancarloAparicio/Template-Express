import { Request, Response } from 'express';
import User from '../../database/models/User';
import { getRepository } from 'typeorm';

class ApiController {
	async index(req: Request, res: Response) {
		let users = await getRepository(User).find();
		return res.json(users);
	}

	async store(req: Request, res: Response) {
		let newUser = getRepository(User).create(req.body);
		let result = await getRepository(User).save(newUser);

		return res.json(result);
	}

	async show(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	async update(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	async destroy(req: Request, res: Response) {
		return res.json(req.params.id);
	}
}

export default new ApiController();
