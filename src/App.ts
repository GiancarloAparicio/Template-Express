import cors from 'cors';
import path from 'path';
import 'reflect-metadata';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/index.routes';
import { createConnection } from 'typeorm';
import handle from './app/exceptions/handle';
import express, { Application } from 'express';
import AuthJWT from './app/middlewares/AuthJWT';

import { APP_PORT, APP_ENV, APP_PATH_FILE } from './config/config';

export default class App {
	app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.typeOrm();
		this.middlewares();
		this.routes();
		this.handles();
	}

	config() {
		this.app.set('port', APP_PORT || 8000);
	}

	middlewares() {
		this.app.use(morgan(APP_ENV === 'local' ? 'dev' : 'common'));
		this.app.use(
			`${APP_PATH_FILE}`,
			express.static(path.resolve(`${APP_PATH_FILE}`))
		);
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(AuthJWT);
		this.app.use(compression());
	}

	typeOrm() {
		return createConnection();
	}

	handles() {
		this.app.use(handle);
	}

	routes() {
		for (let route in routes) {
			this.app.use(`/${route}`, routes[route]);
		}
	}

	listen() {
		this.app.listen(this.app.get('port'));
	}
}
