import fs from 'fs-promise';
import path from 'path';
import db from '../../database/db';
import { getProductsImagePath } from '../../api/services/productImages';
import { getFileNameWithNoExtension, deleteFile } from '../../utils';

const getProductImagesIds = () =>
  db.any('SELECT image_id from product_images')
    .then(result => result.map(({ image_id: image }) => image));

const PLACEHOLDER_IMAGE = getProductsImagePath('placeholder');

const deleteProductImage = imagePath =>
  deleteFile(imagePath, () => imagePath !== PLACEHOLDER_IMAGE);

export const cleanAllPreviouslyCreatedImages = () =>
  fs.readdir(path.join(process.env.IMAGESDIR, 'products'))
    .then(files => files.map(file => getProductsImagePath(getFileNameWithNoExtension(file))))
    .then(filePaths => (filePaths.length
      ? Promise.all(filePaths.map(deleteProductImage))
      : true));

const writeImage = (id, data) => fs.writeFile(getProductsImagePath(id), data);

const writeAllImages = ids =>
  fs.open(PLACEHOLDER_IMAGE, 'r')
    .then(fs.readFile)
    .then(data => Promise.all(ids.map(id => writeImage(id, data))));

export default () =>
  cleanAllPreviouslyCreatedImages()
    .then(getProductImagesIds)
    .then(writeAllImages);
