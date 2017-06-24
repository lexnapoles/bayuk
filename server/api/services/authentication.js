import jwt from "jsonwebtoken";
import {randomBytes, pbkdf2} from "../../../lib/promisifiedCrypto";

const config = {
	hashBytes:  64,
	saltBytes:  64,
	iterations: 1000,
	digest:     "sha512"
};

export const setPassword = password => {
	let salt = "";

	return randomBytes(config.saltBytes)
		.then(bytes => salt = bytes.toString("hex"), salt)
		.then(salt => pbkdf2(password, salt, config.iterations, config.hashBytes, config.digest))
		.then(hash => ({salt, hash: hash.toString("hex")}));
};

export const validPassword = (password, {hash, salt}) =>
	pbkdf2(password, salt, config.iterations, config.hashBytes, config.digest)
		.then(calculatedHash => calculatedHash.toString("hex") === hash ? true : Promise.reject());

export const createJwt = payload => {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + process.env.JWT_LIFETIME);

	return jwt.sign({
		...payload,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};
