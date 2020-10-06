import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

export default (
	err: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err);
	return res.json({
		errors: err,
	});
};
