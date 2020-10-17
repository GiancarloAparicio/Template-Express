import log from '../../config/winston';
import ErrorBase from './errors/ErrorBase';
import { Response, Request, NextFunction } from 'express';
import ValidationException from './errors/ValidationException';
import AuthorizationException from './errors/AuthorizationException';
import AuthenticationException from './errors/AuthenticationException';

const handleErrors = (
	err: ErrorBase,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let error = err.build();

	if (err instanceof ValidationException) {
		log.error(`Validation-Exception:  Invalid request (${error.code})`);
		res.status(error.code).json(error);
	}

	if (err instanceof AuthenticationException) {
		log.error(`Authentication-Exception:  ${error.details} (${error.code})`);
		res.status(error.code).json(error);
	}

	if (err instanceof AuthorizationException) {
		log.error(`Authorization-Exception:  ${error.details} (${error.code})`);
		res.status(error.code).json(error);
	}
};

export default handleErrors;
