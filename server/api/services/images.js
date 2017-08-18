import { has } from 'lodash/object';
import fs from 'fs-promise';
import path from 'path';
import { wrapDataInPromise, isImageBase64, deleteFile } from '../../utils';

const getUUIDv4 = (url) => {
  const UUIDv4Regex = /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i;

  return url.match(UUIDv4Regex)[0];
};

export const extractIdsFromImageUrls = urls => urls.map(getUUIDv4);

export const getImagePath = (id, dir) => `${path.join(process.env.IMAGESDIR, `/${dir}`, id)}.jpg`;

export const getDecodedImage = (data) => {
  const img = data.replace(/^data:image\/\w+;base64,/, '');

  return new Buffer(img, 'base64');
};

export const isImageObjValid = image => has(image, 'id') && has(image, 'data');

const writeOneImageToDisk = ({ path: imagePath, data }) => fs.writeFile(imagePath, data);

export const writeImagesToDisk = (images = []) => {
  if (!Array.isArray(images) || !images.length) {
    return Promise.reject('No images has been passed');
  }

  const promises = wrapDataInPromise(images, writeOneImageToDisk);

  return Promise.all(promises);
};

export const deleteImagesFromDisk = (images = []) => {
  if (!Array.isArray(images) || !images.length) {
    return Promise.reject('Cannot delete images from disk, no images has been passed');
  }

  const promises = wrapDataInPromise(images, deleteFile);

  return Promise.all(promises);
};

export const getImagesToDelete = (newImages, oldImages) => {
  const unmodifiedImages = extractIdsFromImageUrls(newImages.filter(img => !isImageBase64(img)));

  return oldImages.filter(img => !unmodifiedImages.find(elem => img === elem));
};
