import {QueryFile} from "pg-promise";
import path from "path";

function sql(file) {
	const fullPath = path.join(__dirname, file);

	return new QueryFile(fullPath, {minify: true});
}

export const categories = {
	get:      sql("categories/get.sql"),
	add:      sql("categories/add.sql"),
	truncate: sql("categories/truncate.sql")
};

export const products = {
	getAll:   sql("products/getAll.sql"),
	truncate: sql("products/truncate.sql")
};

