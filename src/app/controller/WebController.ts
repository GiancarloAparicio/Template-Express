import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

class WebController {
	async index(req: Request, res: Response) {
		return res.json('');
	}

	async create(req: Request, res: Response) {
		let data;
		return res.render('view', data);
	}

	async store(req: Request, res: Response) {
		return res.json(req.body);
	}

	async show(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	async edit(req: Request, res: Response) {
		let data;
		return res.render('view', data);
	}

	async update(req: Request, res: Response) {
		return res.json(req.params.id);
	}

	async destroy(req: Request, res: Response) {
		return res.json(req.params.id);
	}
}

export default new WebController();
