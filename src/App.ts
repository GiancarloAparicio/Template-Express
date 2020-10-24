import cors from 'cors';
import path from 'path';
import 'reflect-metadata';
import morgan from 'morgan';
import helmet from 'helmet';
import * as www from './config/www';
import compression from 'compression';
import swagger from './config/swagger';
import { createConnection } from 'typeorm';
import routes from './routes/index.routes';
import handleError from './app/errors/handle';
import express, { Application } from 'express';
import AuthJWT from './app/middlewares/auth/JWT';
import { APP_PORT, APP_ENV, APP_PATH_FILE, SWAGGER_PATH } from './config/config';

export default class App {
	private app: Application;

	constructor() {
		this.node();
		this.app = express();
		this.typeOrm();
		this.config();
		this.middlewares();
		this.routes();
		this.errors();
	}

	private node() {
		process.on('unhandledRejection', www.unhandledRejection);

		process.on('error', www.error);

		process.on('uncaughtException', www.uncaughtException);

		process.on('listening', www.listening);
	}

	private config() {
		this.app.set('port', APP_PORT);
		this.app.use(express.static(path.join(__dirname, `${APP_PATH_FILE}`)));
	}

	private middlewares() {
		this.app.use(morgan(APP_ENV === 'local' ? 'dev' : 'common'));
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(AuthJWT);
		this.app.use(SWAGGER_PATH, swagger.serve, swagger.setup);
	}

	private routes() {
		for (let route in routes) {
			this.app.use(`/${route}`, routes[route]);
		}
	}

	private typeOrm() {
		return createConnection();
	}

	listen(port: number = 8000) {
		this.app.listen(this.app.get('port') || port);
		console.log(`APP port: ${this.app.get('port')}`);
	}

	private errors() {
		this.app.use(handleError);
	}

	getApplication(): Application {
		return this.app;
	}
}
