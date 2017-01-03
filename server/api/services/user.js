import db from "../../db";
import {randomBytes, pbkdf2} from "../utils/promisifiedCrypto";

const config = {
	hashBytes:  64,
	saltBytes:  64,
	iterations: 1000,
	digest:     "sha512"
};

const getUser = email =>
	db.any("SELECT name, email, hash, salt from users WHERE email=$1", email);

const setPassword = password =>
	randomBytes(config.saltBytes)
		.then(salt =>
			pbkdf2(password, salt.toString("hex"), config.iterations, config.hashBytes, config.digest)
				.then(hash => ({salt, hash}))
		);

const addUserToDB = (email, name, {hash, salt}) =>
	db.none("INSERT INTO users (email, name, hash, salt) VALUES ($1, $2, $3, $4)", [email, name, hash, salt]);

export const addUser = ({email, name, password}) =>
	setPassword(password)
		.then(credentials => addUserToDB(email, name, credentials));

const validPassword = (password, credentials) =>
	pbkdf2(password, credentials.salt.toString("hex"), config.iterations, config.hashBytes, config.digest)
		.then(hash => credentials.hash === hash);

export const validatePassword = (email, password) =>
	getUser(email)
		.then(({hash, salt}) => ({hash, salt}))
		.then(validPassword.bind(void 0, password));

