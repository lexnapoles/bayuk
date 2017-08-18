import fs from 'fs-promise';

export const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

export const deleteFile = (path, validator = () => true) =>
  fs.open(path, 'r')
    .then(() => (validator(path) ? fs.unlink(path) : true))
    .catch((error) => {
      if (error.code === 'ENOENT') {
        throw new Error(`${path} does not exist`);
      }
    });

export const wrapDataInPromise = (dataArr = [], func) => {
  if (!dataArr.length) {
    return Promise.reject('No data has been passed');
  }

  return dataArr.map(data => Promise.resolve(func(data)));
};

export const isImageBase64 = file => file.search(/^data:image\/\w+;base64,/) !== -1;

export const mapArraysSequentially = (arr1 = [], arr2 = []) => {
  if (arr1.length > arr2.length) {
    [arr1, arr2] = [arr2, arr1];
  }

  return func => arr1.map((val, index) => func(val, arr2[index]));
};

export const generateSingleImageObject = (id, data) => ({ id, data });

export const generateImagesObjs = (ids, data) =>
  mapArraysSequentially(ids, data)(generateSingleImageObject);

export const getFileNameWithNoExtension = file => file.split('.')[0];

export const getImagePath = (entity, imageId) => `/image/${entity}/${imageId || 'default'}.jpg`;

export const getBaseUrl = req => `${req.protocol}://${req.headers.host}`;
