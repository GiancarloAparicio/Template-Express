import mongoose, { ConnectionOptions } from 'mongoose';
import { MONGOOSE_USER, MONGOOSE_PASSWORD, MONGOOSE_URI } from './config';

const options: ConnectionOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	user: MONGOOSE_USER,
	pass: MONGOOSE_PASSWORD,
};

mongoose.connect(MONGOOSE_URI, options);

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('Mongodb Connection');
});

connection.on('error', (err) => {
	console.error('Error:', err);
	process.exit();
});
