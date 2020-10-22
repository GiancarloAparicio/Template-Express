import Reply from '../services/Reply';
import User from '../../database/models/User';
import QuerySqlException from '../errors/exceptions/QuerySqlException';
import { removeProperty } from '../helpers/helper';

export default class UserRepository {
	static async create(data: { name: string; email: string; password: string }) {
		let user = await User.findOne({ email: Reply.request.body.email });
		if (user) {
			Reply.next(
				new QuerySqlException([{ user: 'User exists' }], 'Bad request')
			);
		} else {
			try {
				let newUser = new User(data);
				newUser.save();
				return removeProperty(newUser.toJSON(), 'password');
			} catch (error) {
				Reply.next(
					new QuerySqlException(
						[{ user: 'User fail' }],
						'Cannot create a new User'
					)
				);
			}
		}
	}

	static async findOneOrFail(data: object, toJSON: boolean = false) {
		let user = await User.findOne(data);

		if (!user) {
			return Reply.next(
				new QuerySqlException([{ user: 'User not exists' }], 'Not found')
			);
		} else {
			if (toJSON) {
				return user.toJSON();
			}
			return user;
		}
	}
}
