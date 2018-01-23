import fs from 'fs-promise';
import path from 'path';
import db from '../../database/db';
import { getProductsImagePath } from '../../api/services/productImages';
import { getFileNameWithNoExtension, deleteFile } from '../../utils';

const writeImage = (id, data) => fs.writeFile(getProductsImagePath(id), data);

const getProductImagesIds = () =>
  db.any('SELECT image_id from product_images')
    .then(result => result.map(({ image_id: image }) => image));

const PLACEHOLDER_IMAGE = getProductsImagePath('placeholder');

const deleteProductImage = imagePath =>
  deleteFile(imagePath, () => imagePath !== PLACEHOLDER_IMAGE);


export const cleanAllPreviouslyCreatedImages = async function cleanAllPreviouslyCreatedImages() {
  const files = await fs.readdir(path.join(process.env.IMAGESDIR, 'products'));
  const filePaths = await files.map(file => getProductsImagePath(getFileNameWithNoExtension(file)));

  return filePaths.length
    ? Promise.all(filePaths.map(deleteProductImage))
    : true;
};

async function writeAllImages(ids) {
  const fd = await fs.open(PLACEHOLDER_IMAGE, 'r');

  const data = fs.readFile(fd);

  return Promise.all(ids.map(id => writeImage(id, data)));
}

export default async function () {
  await cleanAllPreviouslyCreatedImages();

  const productImagesIds = await getProductImagesIds();

  await writeAllImages(productImagesIds);
}
