import db from "../db";
import seedCategoriesTable from "./categoriesTableSeeder";
import seedUsersTable from "./usersTableSeeder";
import seedProductsTable from "./productsTableSeeder";
import seedReviewsTable from "./reviewsTableSeeder";

export default () => {
	if (process.env.NODE_ENV === "production") {
		return;
	}

	db.none("TRUNCATE users, products, categories RESTART IDENTITY CASCADE");

	let users = [];

	return seedCategoriesTable()
		.then(seedUsersTable)
		.then(createdUsers => users = createdUsers)
		.then(() => seedReviewsTable(users))
		.then(() => seedProductsTable(users))
		.catch(error => {
			console.error(error);
			process.exit(1);
		});
};