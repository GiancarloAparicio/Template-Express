import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME || 'Express API';
export const APP_ENV = process.env.APP_ENV;
export const APP_KEY = process.env.APP_KEY;
export const APP_KEY_JWT = process.env.APP_KEY_JWT;
export const APP_DEBUG = process.env.APP_DEBUG;
export const APP_PORT = process.env.APP_PORT || 8000;
export const APP_URL = process.env.APP_URL;
export const APP_PATH_FILE = process.env.APP_PATH_FILE;

export const MONGOOSE_USER = process.env.MONGOOSE_USER || '';
export const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD || '';
export const MONGOOSE_HOST = process.env.MONGOOSE_HOST || 'localhost';
export const MONGOOSE_DATABASE = process.env.MONGOOSE_DATABASE || 'express';
export const MONGOOSE_PORT = process.env.MONGOOSE_PORT || '27017';
export const MONGOOSE_URI = `mongodb://${MONGOOSE_HOST}:${MONGOOSE_PORT}/${MONGOOSE_DATABASE}`;

export const SWAGGER_VERSION = process.env.SWAGGER_VERSION || '1.0.0';
export const SWAGGER_TITLE = process.env.SWAGGER_TITLE || 'API';
export const SWAGGER_DESCRIPTION =
	process.env.SWAGGER_DESCRIPTION || 'API description';
export const SWAGGER_CONTACT_NAME =
	process.env.SWAGGER_CONTACT_NAME || 'API developer';
export const SWAGGER_SERVER = APP_URL + ':' + APP_PORT || 'http://localhost:8000';
export const SWAGGER_PATH = process.env.SWAGGER_PATH || '/api/docs';
