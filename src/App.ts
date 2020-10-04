import express, { Application, Router } from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

import routes from './routes';

export default class App {
	app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.middlewares();
		this.routes();
		this.typeOrm();
	}

	config() {
		dotenv.config();
		this.app.set('port', process.env.APP_PORT || 8000);
	}

	middlewares() {
		this.app.use(morgan(process.env.APP_ENV === 'local' ? 'dev' : 'common'));
		this.app.use(
			`${process.env.APP_PATH_FILE}`,
			express.static(path.resolve(`${process.env.APP_PATH_FILE}`))
		);
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(compression());
	}

	typeOrm() {
		const connection = createConnection();
		return connection;
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
