import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {
	SWAGGER_VERSION,
	SWAGGER_TITLE,
	SWAGGER_CONTACT_NAME,
	SWAGGER_DESCRIPTION,
	SWAGGER_SERVER,
} from '../config/config';

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			version: SWAGGER_VERSION,
			title: SWAGGER_TITLE,
			description: SWAGGER_DESCRIPTION,
			contact: {
				name: SWAGGER_CONTACT_NAME,
			},
			servers: [SWAGGER_SERVER],
		},
	},
	apis: ['./routes/**/*.ts'],
};

export default {
	serve: swaggerUi.serve,
	setup: swaggerUi.setup(swaggerJsDoc(swaggerOptions)),
};
