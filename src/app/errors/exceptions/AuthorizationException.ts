import ErrorBase from './ErrorBase';

export default class AuthorizationException extends ErrorBase {
	constructor(errors: object | Array<object>) {
		super('Authorization Exception');
		this.status(403);
		this.details('Forbidden');
		this.errors(errors);
	}
}
