import log from '../../config/winston';
import ErrorBase from './errors/ErrorBase';
import { Response, Request } from 'express';
import ValidationException from './errors/ValidationException';
import AuthorizationException from './errors/AuthorizationException';
import AuthenticationException from './errors/AuthenticationException';

export default (err: ErrorBase, req: Request, res: Response) => {
	let error = err.build();

	if (err instanceof ValidationException) {
		log.error(`Validation Exception:  Invalid request (${error.code})`);
		return res.status(error.code).json(error);
	}

	if (err instanceof AuthenticationException) {
		log.error(`Authentication Exception:  ${error.details} (${error.code})`);
		return res.status(error.code).json(error);
	}

	if (err instanceof AuthorizationException) {
		log.error(`Authorization Exception:  ${error.details} (${error.code})`);
		return res.status(error.code).json(error);
	}

	return res.status(400).json({ errors: err });
};
