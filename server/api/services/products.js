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
    sold: null,
    lastId: '',
    ...filters,
  };

  const sortingParameters = {
    lastId: '',
    category: '',
    minPrice: 0,
    maxPrice: 99999,
    sold: false,
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

export const deleteProduct = productId =>
  getImagesOfProduct(productId)
    .then(deleteProductImagesFromDisk)
    .then(deleteProductFromDB.bind(undefined, productId));

export const addProductWithAllFields = product => db.one(products.addWithAllFields, product);
