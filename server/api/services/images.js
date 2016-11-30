import db from "../../db";
import fs from "fs-promise";
import path from "path";

const getDecodedImage = data => {
	const img = data.replace(/^data:image\/\w+;base64,/, "");

	return new Buffer(img, "base64");
};

const addImageToDB = productId => {
	if (!productId) {
		return Promise.reject("Product id is not defined");
	}

	return db.one("INSERT into images (product_id) VALUES ($1) RETURNING image_id", productId);
};

const writeImageToDisk = (data, id) => {
	const imagePath = `${path.join(process.env.IMAGESDIR, "/products", id)}.jpg`;

	return fs.writeFile(imagePath, getDecodedImage(data));
};

const addOneImage = (image, productId) =>
	addImageToDB(productId)
		.then(({image_id}) => writeImageToDisk(image, image_id))
		.catch(Promise.reject);


const addImages = (images = [], productId) => {
	if (!images.length) {
		return Promise.reject("No images has been passed");
	}

	const wrappedImagesInPromises = images.map(img =>
		new Promise((resolve, reject) =>
			addOneImage(img, productId)
				.then(resolve)
				.catch(reject))
	);

	return Promise.all(wrappedImagesInPromises)
								.then(() => productId);
};

export default addImages;