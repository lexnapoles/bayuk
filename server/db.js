const pgp = require("pg-promise")();

export default pgp({});

export const queryResult = pgp.queryResult;