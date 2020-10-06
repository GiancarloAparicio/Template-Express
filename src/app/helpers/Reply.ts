export default class Reply {
	static data: object;
	static code: number;

	static badRequest(code: number = 400, title: string, details: string) {
		Reply.code = code;
		Reply.data = {
			errors: [
				{
					status: code,
					title,
					details,
				},
			],
		};

		return Reply.data;
	}

	static internal(code: number = 500, details: string) {
		Reply.code = code;
		Reply.data = {
			errors: [
				{
					status: code,
					title: 'Internal server error',
					details,
				},
			],
		};

		return Reply.data;
	}

	static success(code: number = 200, title: string, attributes: any) {
		if (attributes.hasOwnProperty('password')) {
			delete attributes.password;
		}

		Reply.code = code;
		Reply.data = {
			data: [
				{
					type: title,
					status: code,
					attributes,
				},
			],
		};

		return Reply.data;
	}
}
