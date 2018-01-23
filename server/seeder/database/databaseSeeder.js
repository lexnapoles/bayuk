import db from '../../database/db';
import seedCategoriesTable from './categoriesTableSeeder';
import seedUsersTable from './usersTableSeeder';
import seedProductsTable from './productsTableSeeder';
import seedReviewsTable from './reviewsTableSeeder';
import seedProductImagesTable from './productImagesSeeder';

export default async function () {
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }

  await db.none(
    'TRUNCATE users, products, product_images, reviews, categories RESTART IDENTITY CASCADE');

  await seedCategoriesTable();
  await seedUsersTable();

  const users = await seedUsersTable();
  const products = await seedProductsTable(users);

  await seedReviewsTable(users, products);

  return seedProductImagesTable(products);
}
