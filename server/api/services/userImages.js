import db from "../../db";
import {users} from "../../sql/sql";
import {getImagePath, isImageObjValid, writeImagesToDisk, deleteImagesFromDisk, getDecodedImage} from "./images";
import {isBase64, generateImagesObjs} from "../../../utils/utils";

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
		id:   getUserImagePath(image.id),
		data: getDecodedImage(image.data)
	};

	return writeImagesToDisk([imageToWrite]);
};

export const addUserImageToDB = id =>
	db.one(users.addImage, {id})
		.then(({image}) => image);

export const addImage = (userId, imageToAdd = "") => {
	if (!imageToAdd.length) {
		return;
	}

	return addUserImageToDB(userId)
		.then(imageId => {
			const image = generateImagesObjs([imageId], [imageToAdd]);

			return writeUserImageToDisk(image);
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
	if (!image.length) {
		return;
	}

	return deleteUserImageFromDB(image)
		.then(deleteUserImageFromDisk.bind(void 0, image));
};

export const updateUserImage = (userId, image = "") => {
	if (image === null || !image.length || !isBase64(image)) {
		return;
	}

	return getImageOfUser(userId)
		.then(deleteUserImage)
		.then(addImage.bind(void 0, userId, image));
};