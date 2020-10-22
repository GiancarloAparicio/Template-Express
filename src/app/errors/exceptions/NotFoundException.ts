import ErrorBase from './ErrorBase';

export default class NotFoundException extends ErrorBase {
	constructor(details: string) {
		super('Not Found Exception');
		this.status(404);
		this.details(details);
	}
}
