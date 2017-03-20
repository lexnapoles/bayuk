import databaseSeeder from "./database/databaseSeeder";
import fsImagesSeeder from "./filesystem/productsImagesSeeder";

export default () => {
	return databaseSeeder()
		.then(fsImagesSeeder)
		.catch(error => {
			console.error(error);
			process.exit(1);
		});
};
