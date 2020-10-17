import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { APP_KEY_JWT } from '../../config/config';
import AuthenticationException from '../errors/exceptions/AuthenticationException';
import Reply from '../services/Reply';

/**
 * Encrypts a string and returns the encrypted string,
 * as the second parameter the number of salt
 * @param password
 * @param salt
 */
export async function encryptTo(
	password: string,
	salt: number = 10
): Promise<string> {
	let getSalt = await bcrypt.genSalt(salt);

	return await bcrypt.hash(password, getSalt);
}

/**
 * Compare if the string "test" corresponds to the encryption "password",
 * As a third parameter, it receives if the function threw an Exception on failure
 * @param test
 * @param password
 */
export async function matchEncryptTo(
	test: string,
	password: string,
	exception: boolean = true
) {
	if (await bcrypt.compare(test, password)) {
		return true;
	}

	if (exception) {
		Reply.next(
			new AuthenticationException({
				details: 'Password incorrect',
			})
		);
	}

	return false;
}

/**
 * Digitally sign the "data" object,
 * as the second parameter the number of hours before expiration
 * @param data
 * @param expires
 */
export function signJWT(data: object, expires: number = 1): string {
	return jwt.sign(data, `${APP_KEY_JWT}`, {
		expiresIn: expires + 'h',
	});
}

/**
 * Check if the authorization field exists and that the token is valid
 * @param req
 */
export function verifyJWT(req: Request) {
	if (req.headers.authorization) {
		let token = req.headers.authorization.split(' ')[1];
		return jwt.verify(token, `${APP_KEY_JWT}`);
	}
}
