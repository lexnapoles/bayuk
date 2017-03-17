import faker from "faker";
import {sample} from "lodash/collection";
import {times} from "lodash/util";

import {setPassword} from "../api/services/authentication";
import db from "../db";
import {MAX_USERS, MAX_PRODUCTS, MAX_USER_RATING, categories} from "./config";
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
			rating: faker.random.number(MAX_USER_RATING),
			location,
			hash,
			salt
		}));
};

const getProduct = userId => ({
	uuid:        faker.random.uuid(),
	owner:       userId,
	name:        faker.random.words(),
	description: faker.lorem.sentences(),
	category:    sample(categories),
	price:       faker.random.number(500),
	createdAt:   faker.date.recent(),
	sold:        faker.random.boolean()
});

const addCategory = category => db.none("INSERT INTO categories (category) VALUES ($1)", category);

const addUser = ({uuid, email, name, hash, salt, location: {latitude, longitude}, rating}) => {
	return db.none("INSERT INTO users" +
					"(uuid, email, name, hash, salt, location, rating) " +
					"VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_Point($6, $7),4326), $8)",
					[uuid, email, name, hash, salt, latitude, longitude, rating]);
};

const addProduct = product =>
	db.none("INSERT INTO products (owner, uuid, name, description, category, price, created_at, sold) " +
		"VALUES (${owner}, ${uuid}, ${name}, ${description}, ${category}, ${price}, ${createdAt}, ${sold})", product);

const seedCategories = categories => Promise.all(wrapDataInPromise(categories, addCategory));

const seedUsers = () => {
	let users = [];

	return Promise.all(times(MAX_USERS, getUser))
					.then(result => {
						users = result;
						return Promise.all(wrapDataInPromise(result, addUser))
					})
					.then(() => users);
};

const seedProducts = users => {
	const userIds  = Array.from(users, ({uuid}) => uuid),
				products = times(MAX_PRODUCTS, getProduct.bind(void 0, sample(userIds)));

	return Promise.all(wrapDataInPromise(products, addProduct))
		.then(() => products);
};

export default () => {
	if (process.env.NODE_ENV === "production") {
		return;
	}

	db.none("TRUNCATE users, products, categories RESTART IDENTITY CASCADE");

	return seedCategories(categories)
		.then(seedUsers)
		.then(seedProducts)
		.catch(error => {
			console.error(error);
			process.exit(1);
		});
};