import ErrorBase from './ErrorBase';

export default class AuthenticationException extends ErrorBase {
	constructor(errors: object | Array<object>) {
		super('Authentication Exception');
		this.status(403);
		this.errors(errors);
	}
}
