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

export const addProduct = product =>
  addProductToDB(product)
    .then((createdProduct) => {
      const imagesIds = createdProduct.images;
      const imagesData = product.images;
      const images = generateImagesObjs(imagesIds, imagesData);

      writeProductImagesToDisk(images);

      return createdProduct;
    });

const updateProductFromDB = product => db.one(products.update, product);

export const updateProduct = product =>
  updateProductImages(product.id, product.images)
    .then(() => updateProductFromDB(product));

const deleteProductFromDB = productId => db.proc('delete_product', productId);

export const deleteProduct = async function deleteProduct(productId) {
  try {
    const productImages = await getImagesOfProduct(productId);

    await deleteProductImagesFromDisk(productImages);

    return deleteProductFromDB(productId);
  } catch (e) {
    throw new Error(e);
  }
};

export const addProductWithAllFields = product => db.one(products.addWithAllFields, product);
