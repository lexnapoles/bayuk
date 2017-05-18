import {every} from "lodash/collection";
import db from "../../db";
import {products} from "../../sql/sql";
import {
	getImagePath,
	getImagesToDelete,
	isImageObjValid,
	writeImagesToDisk,
	deleteImagesFromDisk,
	getDecodedImage
} from "./images";
import {isBase64, generateImagesObjs} from "../../../utils/utils";

export const getProductsImagePath = id => getImagePath(id, "products");


export const getImagesOfProduct = id =>
	db.one(products.getImages, {id})
		.then(({images}) => images);

export const writeProductImagesToDisk = (images = []) => {
	if (!Array.isArray(images) || !images.length) {
		return Promise.reject("No images has been passed");
	}

	if (!every(images, isImageObjValid)) {
		return Promise.reject("Incorrect images format");
	}

	const imagesToWrite = images.map(({id, data}) => ({
		path: getProductsImagePath(id),
		data: getDecodedImage(data)
	}));

	return writeImagesToDisk(imagesToWrite)
		.then(() => images.map(({id}) => id));
};

export const addProductImagesToDB = (id, imagesCount) =>
	db.one(products.addImages, {id, imagesCount})
		.then(({images}) => images);

export const addImages = (productId, imagesToAdd = []) => {
	if (!imagesToAdd.length) {
		return;
	}

	return addProductImagesToDB(productId, imagesToAdd.length)
		.then(imagesIds => {
			const images = generateImagesObjs(imagesIds, imagesToAdd);

			return writeProductImagesToDisk(images);
		});
};

export const deleteProductImagesFromDB = (images = []) => {
	if (!Array.isArray(images) || !images.length) {
		return Promise.reject("Cannot delete images from DB, no images has been passed");
	}

	return db.any("SELECT FROM delete_product_images($1::uuid[])", [images]);
};

export const deleteProductImagesFromDisk = (imagesIds = []) => {
	if (!Array.isArray(imagesIds) || !imagesIds.length) {
		return Promise.reject("Cannot delete images from disk, no images has been passed");
	}

	const imagePaths = imagesIds.map(getProductsImagePath);

	return deleteImagesFromDisk(imagePaths)
};

export const deleteProductImages = (images = []) => {
	if (!images.length) {
		return;
	}

	return deleteProductImagesFromDB(images)
		.then(deleteProductImagesFromDisk.bind(void 0, images));
};

export const updateProductImages = (productId, newImages = []) => {
	const imagesToAdd = newImages.filter(isBase64);

	return getImagesOfProduct(productId)
		.then(getImagesToDelete.bind(void 0, newImages))
		.then(deleteProductImages)
		.then(addImages.bind(void 0, productId, imagesToAdd));
};