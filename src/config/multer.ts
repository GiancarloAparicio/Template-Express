import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
	destination: `${process.env.APP_PATH_FILE}`,
	filename: (req, file, cb) => {
		cb(null, uuid() + path.extname(file.originalname));
	},
});

export default multer({ storage });
