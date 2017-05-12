import db from "../../db";
import {users} from "../../sql/sql";
import {createJwt, setPassword} from "./authentication";

export const getUsers = () =>
	db.any("SELECT * FROM users_with_images")
		.catch(() => Promise.reject("User could not be found"));

export const getUserByEmail = email =>
	db.one("SELECT * from users_with_images WHERE email=$1", email);

export const getUserById = id =>
	db.one("SELECT * from users_with_images WHERE id=$1", id);

export const getCredentials = email =>
	db.one("SELECT hash, salt from users WHERE email=$1", email);

const addUserToDB = ({email, name, location, credentials}) =>	db.one(users.add, {email, name, ...location, ...credentials});

export const addUser = ({email, name, password, location}) =>
	setPassword(password)
		.then(credentials => addUserToDB({email, name, location, credentials}))
		.then(user => ({
			user,
			token: createJwt(user)
		}));

export const updateEmail = (id, email) => db.one(users.updateEmail, {id, email});

export const updatePassword = (id, password) =>
	setPassword(password)
		.then(credentials => db.one(users.updatePassword, {id, ...credentials}));
