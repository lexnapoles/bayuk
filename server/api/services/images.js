import db, {queryResult} from "../../db";
import {wrapDataInPromise} from "../../../utils/utils";
import fs from "fs-promise";
import path from "path";
import {isBase64, generateImagesObjs} from "../../../utils/utils";

export const getImagePath = id => `${path.join(process.env.IMAGESDIR, "/products", id)}.jpg`;

const getDecodedImage = data => {
	const img = data.replace(/^data:image\/\w+;base64,/, "");

	return new Buffer(img, "base64");
};

export const getImagesOfProduct = id =>
	db.func("get_images_of_product", id, queryResult.one)
		.then(({images}) => images);

const writeOneImageToDisk = ({id, data}) => fs.writeFile(getImagePath(id), getDecodedImage(data));

export const writeImagesToDisk = (images = []) => {
	if (!images.length) {
		return Promise.reject("No images has been passed");
	}

	const promises = wrapDataInPromise(images, writeOneImageToDisk);

	return Promise.all(promises);
};

export const addImagesToDB = (productId, imageCount) =>
	db.func("add_images", [productId, imageCount], queryResult.one)
		.then(({images}) => images);

export const addImages = (productId, imagesToAdd = []) => {
	if (!imagesToAdd.length) {
		return;
	}

	return addImagesToDB(productId, imagesToAdd.length)
		.then(imagesIds => {
			const images = generateImagesObjs(imagesIds, imagesToAdd);

			return writeImagesToDisk(images);
		});
};

export const deleteImagesFromDB = (productId, images = []) => {
	if (!images.length) {
		return Promise.reject("Cannot delete images from DB, no images has been passed");
	}

	return db.any("SELECT FROM delete_images($1::uuid[])", [images]);
};

const deleteOneImageFromDisk = path => fs.unlink(path);

export const deleteImagesFromDisk = (imagesIds = []) => {
	if (!imagesIds.length) {
		return Promise.reject("Cannot delete images from disk, no images has been passed");
	}

	const imagePaths = imagesIds.map(getImagePath),
				promises   = wrapDataInPromise(imagePaths, deleteOneImageFromDisk);

	return Promise.all(promises);
};

export const deleteImages = (productId, images = []) => {
	if (!images.length) {
		return;
	}

	return deleteImagesFromDB(productId, images)
		.then(deleteImagesFromDisk.bind(void 0, images));
};

const getImagesToDelete = (newImages, oldImages) => {
	const unmodifiedImages = newImages.filter(img => !isBase64(img));

	return oldImages.filter(img => !unmodifiedImages.find(elem => img === elem));
};

export const updateImages = (productId, newImages = []) => {
	const imagesToAdd = newImages.filter(isBase64);

	return getImagesOfProduct(productId)
		.then(getImagesToDelete.bind(void 0, newImages))
		.then(deleteImages.bind(void 0, productId))
		.then(addImages.bind(void 0, productId, imagesToAdd));
};