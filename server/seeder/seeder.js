import databaseSeeder from './database/databaseSeeder';
import fsImagesSeeder from './filesystem/productsImagesSeeder';

export default () => databaseSeeder()
  .then(fsImagesSeeder)
  .catch((error) => {
    console.err(error);
    throw new Error(error);
  });
