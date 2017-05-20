import db from "../../db";
import {omit} from "lodash/object";
import {users} from "../../sql/sql";
import {createJwt, setPassword} from "./authentication";
import {updateUserImage, deleteUserImageFromDisk} from "./userImages";

export const getUsers = () =>
	db.any("SELECT * FROM users_with_images")
		.catch(() => Promise.reject("User could not be found"));

export const getUserByEmail = email =>
	db.one("SELECT * from users_with_images WHERE email=$1", email);

export const getUserById = id =>
	db.one("SELECT * from users_with_images WHERE id=$1", id);

export const getCredentials = email =>
	db.one("SELECT hash, salt from users WHERE email=$1", email);

const addUserToDB = user => db.one(users.add, user);

export const addUser = user =>
	setPassword(user.password)
		.then(credentials => addUserToDB({...omit(user, "password"), ...credentials}))
		.then(user => ({
			user,
			token: createJwt(user)
		}));

const updateUserFromDB = user => db.one(users.update, user);

export const updateUser = user =>
	updateUserImage(user.id, user.image)
		.then(() => updateUserFromDB(user));

export const updateEmail = (id, email) => db.one(users.updateEmail, {id, email});

export const updatePassword = (id, password) =>
	setPassword(password)
		.then(credentials => db.one(users.updatePassword, {id, ...credentials}));

export const deleteUser = id => {
	return getUserById(id)
		.then(({image}) => image ? deleteUserImageFromDisk(image) : true)
		.then(() => db.any("SELECT FROM delete_user($1::uuid)", id));
};

