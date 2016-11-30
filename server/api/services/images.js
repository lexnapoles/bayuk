import db from "../../db";
import fs from "fs-promise";
import path from "path";

const getDecodedImage = data => {
	const img = data.replace(/^data:image\/\w+;base64,/, "");

	return new Buffer(img, "base64");
};

const addOneImage = productId => {
	if (!productId) {
		return Promise.reject("Product id is not defined");
	}

	return db.one("INSERT into images (product_id) VALUES ($1) RETURNING image_id", productId)
		.then(({image_id}) => image_id);
};

const writeOneImageToDisk = ({id, data}) => {
	const imagePath = `${path.join(process.env.IMAGESDIR, "/products", id)}.jpg`;

	return fs.writeFile(imagePath, getDecodedImage(data))
		.then(() => id)
};

export const writeImagesToDisk = (images = []) => {
	if (!images.length) {
		return Promise.reject("No images has been passed");
	}

	const wrappedImagesInPromises = images.map(img=>
		new Promise((resolve, reject) =>
			writeOneImageToDisk(img)
				.then(resolve)
				.catch(reject))
	);

	return Promise.all(wrappedImagesInPromises);
};

export const addImages = (imagesCount, productId) => {
	if (!imagesCount) {
		return Promise.reject("No images has been defined");
	}

	const wrappedImagesInPromises = (new Array(imagesCount)).map(() =>
		new Promise((resolve, reject) =>
			addOneImage(productId)
				.then(resolve)
				.catch(reject))
	);

	return Promise.all(wrappedImagesInPromises)
		.then(() => productId);
};

