import db from "../../db";
import {users} from "../../sql/sql";
import {getImagePath, isImageObjValid, writeImagesToDisk, deleteImagesFromDisk, getDecodedImage} from "./images";
import {isImageBase64, generateSingleImageObject} from "../../utils";

export const getUserImagePath = id => getImagePath(id, "users");

export const getImageOfUser = id =>
	db.one(users.getImage, {id})
		.then(({image}) => image);

export const writeUserImageToDisk = image => {
	if (!image) {
		return Promise.reject("No image has been passed");
	}

	if (!isImageObjValid(image)) {
		return Promise.reject("Incorrect image format");
	}

	const imageToWrite = {
		path: getUserImagePath(image.id),
		data: getDecodedImage(image.data)
	};

	return writeImagesToDisk([imageToWrite]);
};


export const addUserImageToDB = id =>
	db.one(users.addImage, {id})
		.then(({image}) => image);

export const addUserImage = (userId, imageToAdd = "") => {
	if (!imageToAdd.length) {
		return Promise.resolve();
	}

	return addUserImageToDB(userId)
		.then(imageId => {
			const image = generateSingleImageObject(imageId, imageToAdd);

			return writeUserImageToDisk(image)
				.then(() => imageId);
		});
};

export const deleteUserImageFromDB = (image = "") => {
	if (!image.length) {
		return Promise.reject("Cannot delete image from DB, no image has been passed");
	}

	return db.any("SELECT FROM delete_user_image($1::uuid)", image);
};

export const deleteUserImageFromDisk = (imageId = "") => {
	if (!imageId.length) {
		return Promise.reject("Cannot delete images from disk, no image has been passed");
	}

	const imagePath = getUserImagePath(imageId);

	return deleteImagesFromDisk([imagePath])
};

export const deleteUserImage = (image = "") => {
	if (image === null || !image.length) {
		return Promise.resolve();
	}

	return deleteUserImageFromDB(image)
		.then(deleteUserImageFromDisk.bind(void 0, image));
};

export const updateUserImage = (userId, image = "") => {
	if (image === null || !image.length || !isImageBase64(image)) {
		return Promise.resolve();
	}

	return getImageOfUser(userId)
		.then(deleteUserImage)
		.then(addUserImage.bind(void 0, userId, image));
};