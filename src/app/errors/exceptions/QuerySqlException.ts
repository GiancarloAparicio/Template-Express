import ErrorBase from './ErrorBase';

export default class QuerySqlException extends ErrorBase {
	constructor(errors: object | Array<object>, details: string) {
		super('Query Sql Exception');
		this.status(400);
		this.details(details);
		this.errors(errors);
	}
}
