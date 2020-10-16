import log from '../../config/winston';
import { Response } from 'express';

export default class Reply {
	static data: object;
	static code: number;
	static response: Response;

	static badRequest(title: string, details: string) {
		log.error(`${title}:  ${details} (${Reply.code})`);

		Reply.data = {
			errors: [
				{
					status: Reply.code || 400,
					title,
					details,
				},
			],
		};

		return Reply.response.status(Reply.code).json(Reply.data);
	}

	static internal(details: string) {
		log.error(`Internal server error:  ${details}  (${Reply.code})`);

		Reply.data = {
			errors: [
				{
					status: Reply.code || 500,
					title: 'Internal server error',
					details,
				},
			],
		};

		return Reply.response.status(Reply.code).json(Reply.data);
	}

	static success(title: string, attributes: any) {
		log.info(`Title: ${title}  (${Reply.code})`);

		if (attributes.hasOwnProperty('password')) {
			delete attributes.password;
		}

		Reply.data = {
			data: [
				{
					type: title,
					status: Reply.code || 200,
					attributes,
				},
			],
		};

		return Reply.response.status(Reply.code).json(Reply.data);
	}

	static status(code: number) {
		Reply.code = code;
		return Reply;
	}
}
