import Reply from '../services/Reply';
import log from '../../config/winston';
import User from '../../database/models/User';
import QuerySqlException from '../errors/exceptions/QuerySqlException';

export default class UserRepository {
	static async create(data: any) {
		let user = await User.findOne({ email: Reply.request.body.email });
		if (user) {
			return Reply.next(
				new QuerySqlException([{ user: 'User exists' }], 'Bad request')
			);
		} else {
			try {
				let newUser = new User(data);
				return newUser.save();
			} catch (error) {
				log.error('Internal server error: UserRepository (17)');
				return Reply.next(
					new QuerySqlException(
						[{ user: 'User exists' }],
						'Cannot create a new User'
					)
				);
			}
		}
	}

	static async findOneOrFail(data: object, toJSON: boolean = false) {
		let user = await User.findOne(data);

		if (!user) {
			log.error('Query-Sql-Exception: User not exists');
			return Reply.next(
				new QuerySqlException([{ user: 'User not exists' }], 'Not found')
			);
		}
		if (toJSON) {
			return user.toJSON();
		}
		return user;
	}
}
