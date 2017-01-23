import db from "../../db";
import {createJwt, setPassword} from "./authentication";

export const getUser = email =>
	db.one("SELECT uuid, name, email, rating from users WHERE email=$1", email);

export const getCredentials = email =>
	db.one("SELECT hash, salt from users WHERE email=$1", email);

const addUserToDB = (email, name, {hash, salt}) =>
	db.none("INSERT INTO users (email, name, hash, salt) VALUES ($1, $2, $3, $4)", [email, name, hash, salt]);

export const addUser = ({email, name, password}) =>
	setPassword(password)
		.then(credentials => addUserToDB(email, name, credentials))
		.then(() => createJwt({email, name, password}));
