import { Request, Response } from 'express';

export default class AuthController {
	static async index(req: Request, res: Response) {
		return res.json('Success');
	}
}
