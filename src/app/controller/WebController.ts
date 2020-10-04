import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export default class WebController {
	static async index(req: Request, res: Response) {
		return res.json('');
	}

	static async create(req: Request, res: Response) {
		let data;
		return res.render('view', data);
	}

	static async store(req: Request, res: Response) {
		return res.json(req.body);
	}

	static async show(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	static async edit(req: Request, res: Response) {
		let data;
		return res.render('view', data);
	}

	static async update(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	static async destroy(req: Request, res: Response) {
		return res.json(req.params.id);
	}
}
