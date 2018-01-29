import db from '../../database/db';
import { users } from '../../database/sql/sql';
import {
  getImagePath,
  isImageObjValid,
  writeImagesToDisk,
  deleteImagesFromDisk,
  getDecodedImage,
} from './images';
import { isImageBase64, generateSingleImageObject } from '../../utils';

export const getUserImagePath = id => getImagePath(id, 'users');

export const getImageOfUser = async function getImageOfUser(id) {
  try {
    const { image } = await db.one(users.getImage, { id });

    return image;
  } catch (error) {
    throw new Error(error);
  }
};

export const writeUserImageToDisk = async function writeUserImageToDisk(image) {
  if (!image) {
    throw new Error('No image has been passed');
  }

  if (!isImageObjValid(image)) {
    throw new Error('Incorrect image format');
  }

  const imageToWrite = {
    path: getUserImagePath(image.id),
    data: getDecodedImage(image.data),
  };

  try {
    return writeImagesToDisk([imageToWrite]);
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserImageToDB = async function addUserImageToDB(id) {
  try {
    const { image } = await db.one(users.addImage, { id });

    return image;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserImage = async function addUserImage(userId, imageToAdd = '') {
  if (!imageToAdd.length) {
    return Promise.resolve();
  }

  try {
    const imageId = await addUserImageToDB(userId);

    const image = generateSingleImageObject(imageId, imageToAdd);

    await writeUserImageToDisk(image);

    return imageId;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserImageFromDB = async function deleteUserImageFromDB(image = '') {
  if (!image.length) {
    throw new Error('Cannot delete image from DB, no image has been passed');
  }

  try {
    return db.any('SELECT FROM delete_user_image($1::uuid)', image);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserImageFromDisk = async function deleteUserImageFromDisk(imageId = '') {
  if (!imageId.length) {
    throw new Error('Cannot delete images from disk, no image has been passed');
  }

  const imagePath = getUserImagePath(imageId);

  try {
    return deleteImagesFromDisk([imagePath]);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserImage = async function deleteUserImage(image = '') {
  if (image === null || !image.length) {
    return Promise.resolve();
  }

  try {
    await deleteUserImageFromDB(image);

    return deleteUserImageFromDisk(image);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserImage = async function updateUserImage(userId, image = '') {
  if (image === null || !image.length || !isImageBase64(image)) {
    return Promise.resolve();
  }

  try {
    const oldUserImage = await getImageOfUser(userId);

    await deleteUserImage(oldUserImage);

    return addUserImage(userId, image);
  } catch (error) {
    throw new Error(error);
  }
};
