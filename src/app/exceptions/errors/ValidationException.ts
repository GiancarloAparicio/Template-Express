import ErrorBase from './ErrorBase';

export default class ValidationException extends ErrorBase {
	constructor(errors: object | Array<object>) {
		super('Invalid request, failed validation');
		this.errors(errors);
	}
}
