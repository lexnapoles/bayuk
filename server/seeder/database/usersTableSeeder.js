import faker from "faker";
import {times} from "lodash/util";
import {omit} from "lodash/object";
import {setPassword} from "../../api/services/authentication";
import db from "../../db";
import {MAX_USERS} from "../config";
import {wrapDataInPromise, hasProperties} from "../../../utils/utils";

export const getUser = (user = {}) => {
	const location = {
		latitude:  faker.address.latitude(),
		longitude: faker.address.longitude()
	};

	const password = hasProperties(user, ["password"])
		? user.password
		: faker.internet.password();

	return setPassword(password)
		.then(({hash, salt}) => ({
			uuid:  faker.random.uuid(),
			email: faker.internet.email(),
			name:  faker.name.findName(),
			location,
			hash,
			salt,
			...omit(user, "password")
		}));
};

const addUserToDB = ({uuid, email, name, hash, salt, location: {latitude, longitude}}) => {
	return db.none("INSERT INTO users" +
		"(uuid, email, name, hash, salt, location) " +
		"VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_Point($6, $7),4326))",
		[uuid, email, name, hash, salt, latitude, longitude]);
};

const addAllUsersToDB = users => Promise.all(wrapDataInPromise(users, addUserToDB));

const generateUsers = maxUsers => Promise.all(times(maxUsers, () => getUser()));

export default () => {
	let users = [];

	return generateUsers(MAX_USERS)
		.then(result => {
			users = result;
			return addAllUsersToDB(users);
		})
		.then(() => users);
};