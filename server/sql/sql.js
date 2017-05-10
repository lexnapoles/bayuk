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
	getAll:           sql("products/getAll.sql"),
	getById:          sql("products/getById.sql"),
	addWithAllFields: sql("products/addWithAllFields.sql"),
	add:              sql("products/add.sql"),
	update:           sql("products/update.sql")
};

export const users = {
	add:         sql("users/add.sql"),
	updateEmail: sql("users/updateEmail.sql"),
};

export const global = {
	truncateAll: sql("global/truncateAll.sql")
};
