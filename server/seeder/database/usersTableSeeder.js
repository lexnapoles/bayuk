import faker from "faker";
import {times} from "lodash/util";
import {setPassword} from "../../api/services/authentication";
import db from "../../db";
import {MAX_USERS} from "../config";
import {wrapDataInPromise} from "../../../utils/utils";

const predefinedUsers = [
	{
		name:     "Irene Adler",
		email:    "thewoman@holmes.com",
		password: "thewoman123"
	},
	{
		name:     "Sun Wu Kung",
		email:    "monkeyking@journeytowest.com",
		password: "monkey123"
	}
];

const getUser = (user = {}) => {
	const location = {
		latitude:  faker.address.latitude(),
		longitude: faker.address.longitude()
	};

	return setPassword(faker.internet.password())
		.then(({hash, salt}) => ({
			uuid:  faker.random.uuid(),
			email: faker.internet.email(),
			name:  faker.name.findName(),
			location,
			hash,
			salt,
			...user
		}));
};

const addUserToDB = ({uuid, email, name, hash, salt, location: {latitude, longitude}}) => {
	return db.none("INSERT INTO users" +
		"(uuid, email, name, hash, salt, location) " +
		"VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_Point($6, $7),4326))",
		[uuid, email, name, hash, salt, latitude, longitude]);
};

const generateUsers = (maxUsers, staticUsers = []) => {
	const createAllUsers = [...staticUsers.map(getUser), ...times(MAX_USERS, getUser)];

	return Promise.all(createAllUsers);
};

export default () => {
	let users = [];

	return generateUsers(MAX_USERS, predefinedUsers)
		.then(result => {
			users = result;
			return Promise.all(wrapDataInPromise(result, addUserToDB))
		})
		.then(() => users);
};