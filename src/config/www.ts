import { APP_PORT } from './config';
import log from './winston';

export const unhandledRejection = (error: any) => {
	log.error(error);
};

export const error = (error: any) => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	switch (error.code) {
		case 'EACCES':
			log.error(APP_PORT + ': requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			log.error(APP_PORT + ': is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

export const uncaughtException = (error: any) => {
	log.error(error);
};

export const listening = (error: any) => {
	log.error(error);
};
