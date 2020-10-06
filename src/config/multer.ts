import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { APP_PATH_FILE } from './config';

const storage = multer.diskStorage({
	destination: `${APP_PATH_FILE}`,
	filename: (req, file, cb) => {
		cb(null, uuid() + path.extname(file.originalname));
	},
});

export default multer({ storage });
