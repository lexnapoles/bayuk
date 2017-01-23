import db from "../../db";
import {createJwt, setPassword} from "./authentication";

export const getUsers = () =>
	db.any("SELECT * FROM users_details")
		.catch(() => Promise.reject("User could not be found"));

export const getUserByEmail = email =>
	db.one("SELECT * from users_details WHERE email=$1", email);

export const getUserById = id =>
	db.one("SELECT * from users_details WHERE id=$1", id);

export const getCredentials = email =>
	db.one("SELECT hash, salt from users WHERE email=$1", email);

const addUserToDB = (email, name, {hash, salt}) =>
	db.none("INSERT INTO users (email, name, hash, salt) VALUES ($1, $2, $3, $4)", [email, name, hash, salt]);

export const addUser = ({email, name, password}) =>
	setPassword(password)
		.then(credentials => addUserToDB(email, name, credentials))
		.then(() => createJwt({email, name, password}));
