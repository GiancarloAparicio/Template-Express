import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		id: {
			type: String,
			unique: true,
		},
		name: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('User', userSchema);
