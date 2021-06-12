import { every } from "lodash/collection";
import db from "../../database/db";
import { products } from "../../database/sql/sql";
import {
  getImagePath,
  getImagesToDelete,
  isImageObjValid,
  writeImagesToDisk,
  deleteImagesFromDisk,
  getDecodedImage
} from "./images";
import { isImageBase64, generateImagesObjs } from "../../utils";

export const getProductsImagePath = id => getImagePath(id, "products");

export const getImagesOfProduct = id =>
  db.one(products.getImages, { id }).then(({ images }) => images);

export const writeProductImagesToDisk = async function writeProductImagesToDisk(
  images = []
) {
  if (!Array.isArray(images) || !images.length) {
    throw new Error("No images have been passed");
  }

  if (!every(images, isImageObjValid)) {
    throw new Error("Incorrect images format");
  }

  const imagesToWrite = images.map(({ id, data }) => ({
    path: getProductsImagePath(id),
    data: getDecodedImage(data)
  }));

  try {
    await writeImagesToDisk(imagesToWrite);
  } catch (error) {
    throw new Error(error);
  }

  return images.map(({ id }) => id);
};

export const addProductImagesToDB = (id, imagesCount) =>
  db
    .one(products.addImages, {
      id,
      imagesCount
    })
    .then(({ images }) => images);

export const addProductImages = async function addProductImages(
  productId,
  imagesToAdd = []
) {
  if (!imagesToAdd.length) {
    return Promise.resolve();
  }

  try {
    const imagesIds = await addProductImagesToDB(productId, imagesToAdd.length);

    const images = generateImagesObjs(imagesIds, imagesToAdd);

    await writeProductImagesToDisk(images);

    return imagesIds;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductImagesFromDB = (images = []) => {
  if (!Array.isArray(images) || !images.length) {
    return Promise.reject(
      "Cannot delete images from DB, no images have been passed"
    );
  }

  return db.any("SELECT FROM delete_product_images($1::uuid[])", [images]);
};

export const deleteProductImagesFromDisk = (imagesIds = []) => {
  if (!Array.isArray(imagesIds) || !imagesIds.length) {
    return Promise.reject(
      "Cannot delete images from disk, no images have been passed"
    );
  }

  const imagePaths = imagesIds.map(getProductsImagePath);

  return deleteImagesFromDisk(imagePaths);
};

export const deleteProductImages = async function deleteProductImages(
  images = []
) {
  if (!images.length) {
    return Promise.resolve();
  }

  await deleteProductImagesFromDB(images);

  return deleteProductImagesFromDisk(images);
};

export const updateProductImages = async function updateProductImages(
  productId,
  newImages = []
) {
  try {
    const productImages = await getImagesOfProduct(productId);

    const imagesToDelete = await getImagesToDelete(newImages, productImages);
    await deleteProductImages(imagesToDelete);

    const imagesToAdd = newImages.filter(isImageBase64);
    return addProductImages(productId, imagesToAdd);
  } catch (error) {
    throw new Error(error);
  }
};
