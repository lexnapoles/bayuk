import faker from "faker";
import {times} from "lodash/util";
import {setPassword} from "../api/services/authentication";
import db from "../db";
import {MAX_USERS} from "./config";
import {wrapDataInPromise} from "../../utils/utils";

const getUser = () => {
	const location = {
		latitude:  faker.address.latitude(),
		longitude: faker.address.longitude()
	};

	return setPassword(faker.internet.password())
		.then(({hash, salt}) => ({
			uuid:   faker.random.uuid(),
			email:  faker.internet.email(),
			name:   faker.name.findName(),
			location,
			hash,
			salt
		}));
};

const addUser = ({uuid, email, name, hash, salt, location: {latitude, longitude}}) => {
	return db.none("INSERT INTO users" +
		"(uuid, email, name, hash, salt, location) " +
		"VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_Point($6, $7),4326))",
		[uuid, email, name, hash, salt, latitude, longitude]);
};

export default () => {
	let users = [];

	return Promise.all(times(MAX_USERS, getUser))
					.then(result => {
						users = result;
						return Promise.all(wrapDataInPromise(result, addUser))
					})
					.then(() => users);
};