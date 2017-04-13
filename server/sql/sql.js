import {QueryFile} from "pg-promise";
import path from "path";

function sql(file) {
	const fullPath = path.join(__dirname, file);

	return new QueryFile(fullPath, {minify: true});
}

export const categories = {
	get: sql("categories/get.sql"),
	add: sql("categories/add.sql")
};

export const products = {
	getAll:                  sql("products/getAll.sql"),
	getById:                 sql("products/getById.sql"),
	addProductWithAllFields: sql("products/addProductWithAllFields.sql")
};

export const users = {
	add: sql("users/add.sql")
};

export const global = {
	truncateAll: sql("global/truncateAll.sql")
};
