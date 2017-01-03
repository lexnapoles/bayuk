import db from "../../db";
import jwt from "jsonwebtoken";
import {randomBytes, pbkdf2} from "../utils/promisifiedCrypto";

const config = {
	hashBytes:  64,
	saltBytes:  64,
	iterations: 1000,
	digest:     "sha512"
};

export const createJwt = payload => {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + process.env.JWT_LIFETIME);

	return jwt.sign({
		...payload,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};

export const getUser = email =>
	db.any("SELECT name, email, hash, salt from users WHERE email=$1", email)
		.then(result => result[0]);

const setPassword = password => {
	let salt = "";

	return randomBytes(config.saltBytes)
		.then(bytes => salt = bytes.toString("hex"), salt)
		.then(salt => pbkdf2(password, salt, config.iterations, config.hashBytes, config.digest))
		.then(hash => ({salt, hash: hash.toString("hex")}));
};

const addUserToDB = (email, name, {hash, salt}) =>
	db.none("INSERT INTO users (email, name, hash, salt) VALUES ($1, $2, $3, $4)", [email, name, hash, salt]);

export const addUser = ({email, name, password}) =>
	setPassword(password)
		.then(credentials => addUserToDB(email, name, credentials))
		.then(() => createJwt({email, name, password}));

export const validPassword = (password, credentials) =>
	pbkdf2(password, credentials.salt, config.iterations, config.hashBytes, config.digest)
		.then(hash => credentials.hash === hash.toString("hex") ? true : Promise.reject());
