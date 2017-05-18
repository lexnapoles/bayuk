import {has} from "lodash/object";
import {wrapDataInPromise} from "../../../utils/utils";
import fs from "fs-promise";
import path from "path";
import {isBase64, deleteFile} from "../../../utils/utils";

export const getImagePath = (id, dir) => `${path.join(process.env.IMAGESDIR, `/${dir}`, id)}.jpg`;

export const getDecodedImage = data => {
	const img = data.replace(/^data:image\/\w+;base64,/, "");

	return new Buffer(img, "base64");
};

export const isImageObjValid = image => has(image, "id") && has(image, "data");

const writeOneImageToDisk = ({path, data}) => fs.writeFile(path, data);

export const writeImagesToDisk = (images = []) => {
	if (!Array.isArray(images) || !images.length) {
		return Promise.reject("No images has been passed");
	}

	const promises = wrapDataInPromise(images, writeOneImageToDisk);

	return Promise.all(promises);
};

export const deleteImagesFromDisk = (images = []) => {
	if (!Array.isArray(images) || !images.length) {
		return Promise.reject("Cannot delete images from disk, no images has been passed");
	}

	const promises = wrapDataInPromise(images, deleteFile);

	return Promise.all(promises);
};

export const getImagesToDelete = (newImages, oldImages) => {
	const unmodifiedImages = newImages.filter(img => !isBase64(img));

	return oldImages.filter(img => !unmodifiedImages.find(elem => img === elem));
};