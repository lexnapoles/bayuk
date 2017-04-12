const pgp = require("pg-promise")();

const isTesting = process.env.NODE_ENV === "test";

const testConfig = {
	database: process.env.PGTESTDATABASE,
	user:     process.env.PGTESTUSER,
	password: process.env.PGTESTPASSWORD
};

const connectionOptions = isTesting ? testConfig : {};

export default pgp(connectionOptions);

export const queryResult = pgp.queryResult;