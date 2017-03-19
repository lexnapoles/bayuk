import db from "../db";
import seedCategoriesTable from "./categoriesTableSeeder";
import seedUsersTable from "./usersTableSeeder";
import seedProductsTable from "./productsTableSeeder";

export default () => {
	if (process.env.NODE_ENV === "production") {
		return;
	}

	db.none("TRUNCATE users, products, categories RESTART IDENTITY CASCADE");

	return seedCategoriesTable()
		.then(seedUsersTable)
		.then(seedProductsTable)
		.catch(error => {
			console.error(error);
			process.exit(1);
		});
};