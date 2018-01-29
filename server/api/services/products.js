import db from '../../database/db';
import { products } from '../../database/sql/sql';
import {
  writeProductImagesToDisk,
  deleteProductImagesFromDisk,
  updateProductImages,
  getImagesOfProduct,
} from './productImages';
import { generateImagesObjs } from '../../utils';

export const getProducts = (filters) => {
  const byOwnerParameters = {
    sold: undefined,
    lastId: undefined,
    ...filters,
  };

  const sortingParameters = {
    minPrice: 0,
    maxPrice: 99999,
    lastId: undefined,
    category: undefined,
    sold: undefined,
    ...filters,
  };

  return filters.owner
    ? db.any(products.getByOwner, byOwnerParameters)
    : db.any(products.getByFilters, sortingParameters);
};

export const getProductById = productId => db.one(products.getById, { productId });

const addProductToDB = product =>
  db.one(products.add, {
    ...product,
    images_count: product.images.length,
  });

export const addProduct = async function addProduct(product) {
  try {
    const createdProduct = await addProductToDB(product);

    const imagesIds = createdProduct.images;
    const imagesData = product.images;
    const images = generateImagesObjs(imagesIds, imagesData);

    await writeProductImagesToDisk(images);

    return createdProduct;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductFromDB = product => db.one(products.update, product);

export const updateProduct = async function updateProduct(product) {
  try {
    await updateProductImages(product.id, product.images);

    return updateProductFromDB(product);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProductFromDB = productId => db.proc('delete_product', productId);

export const deleteProduct = async function deleteProduct(productId) {
  try {
    const productImages = await getImagesOfProduct(productId);

    await deleteProductImagesFromDisk(productImages);

    return deleteProductFromDB(productId);
  } catch (error) {
    throw new Error(error);
  }
};

export const addProductWithAllFields = product => db.one(products.addWithAllFields, product);
