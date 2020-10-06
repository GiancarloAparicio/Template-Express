import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { APP_KEY_JWT } from '../../config/config';

export async function encryptTo(password: string, salt: number = 10) {
	let getSalt = await bcrypt.genSalt(salt);

	return await bcrypt.hash(password, getSalt);
}

export async function matchEncryptTo(test: string, password: string) {
	return await bcrypt.compare(test, password);
}

export function signJWT(data: object, expires: number = 1) {
	return jwt.sign(data, `${APP_KEY_JWT}`, {
		expiresIn: expires + 'h',
	});
}

export function getJWT(req: Request) {
	if (req.headers.authorization) {
		let token = req.headers.authorization.split(' ')[1];
		return jwt.verify(token, `${APP_KEY_JWT}`);
	}
}
