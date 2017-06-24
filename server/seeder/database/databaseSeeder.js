import db from "../../database/db";
import seedCategoriesTable from "./categoriesTableSeeder";
import seedUsersTable from "./usersTableSeeder";
import seedProductsTable from "./productsTableSeeder";
import seedReviewsTable from "./reviewsTableSeeder";
import seedProductImagesTable from "./productImagesSeeder";

export default () => {
	if (process.env.NODE_ENV === "production") {
		return;
	}

	let users = [];

	return db.none("TRUNCATE users, products, product_images, reviews, categories RESTART IDENTITY CASCADE")
		.then(seedCategoriesTable)
		.then(seedUsersTable)
		.then(createdUsers => users = createdUsers)
		.then(() => seedProductsTable(users))
		.then(products => seedReviewsTable(users, products).then(() => products))
		.then(seedProductImagesTable);
};