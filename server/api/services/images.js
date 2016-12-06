import db, {queryResult} from "../../db";
import {wrapDataInPromise} from "../utils/utils";
import fs from "fs-promise";
import path from "path";


const getImagePath = id => `${path.join(process.env.IMAGESDIR, "/products", id)}.jpg`;

export const getImagesOfProduct = id =>
	db.func("get_images_of_product", [id], queryResult.one)
		.then(({images}) => images);

const getDecodedImage = data => {
	const img = data.replace(/^data:image\/\w+;base64,/, "");

	return new Buffer(img, "base64");
};

const writeOneImageToDisk = ({id, data}) =>
	fs.writeFile(getImagePath(id), getDecodedImage(data))
		.then(() => id);

export const writeImagesToDisk = (images = []) => {
	if (!images.length) {
		return Promise.reject("No images has been passed");
	}

	const promises = wrapDataInPromise(images, writeOneImageToDisk);

	return Promise.all(promises);
};

const deleteOneImageFromDisk = path => fs.unlink(path);

export const deleteImagesFromDisk =  (imagesIds = []) => {
	if (!imagesIds.length) {
		return Promise.reject("No images has been passed");
	}

	const imagePaths = imagesIds.map(getImagePath),
				promises = wrapDataInPromise(imagePaths, deleteOneImageFromDisk);

	return Promise.all(promises);
};