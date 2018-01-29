import { sendJsonResponse } from '../../../utils';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../services/products';
import transformProduct from '../../transformers/products';
import { productDoesNotExist } from '../../../errors/api/productErrors';
import dbErrors from '../../../errors/database';
import { validateRequest, validateId } from '../validators';
import validateProduct from './validators';
import getFilters from './getFilters';
import addPaginationLink from './addPaginationLink';
import { errorBadRequest, errorNotFound, errorInternalError } from '../../../errors/api/errors';

export const readProducts = async function readProducts(req, res) {
  const { filters, errors: filterErrors } = getFilters(req);

  if (filterErrors.length) {
    errorBadRequest(res, filterErrors);
    return;
  }

  try {
    const products = await getProducts(filters);
    const transformedProducts = products.map(transformProduct.bind(undefined, req));

    await Promise.all(transformedProducts);

    if (transformedProducts.length) {
      addPaginationLink(req, res, transformedProducts, filters);
    }

    sendJsonResponse(res, 200, transformedProducts);
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const readOneProduct = async function readOneProduct(req, res) {
  const requestErrors = [
    ...validateRequest(req, 'params'),
    ...validateRequest(req.params, 'productId'),
  ];

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { productId } = req.params;

  const invalidIdError = validateId(productId);

  if (invalidIdError.length) {
    errorBadRequest(res, invalidIdError);
    return;
  }

  try {
    const product = await getProductById(productId);
    const transformedProduct = await transformProduct(req, product);

    sendJsonResponse(res, 200, transformedProduct);
  } catch (error) {
    if (error.code === dbErrors.dataNotFound) {
      errorNotFound(res, productDoesNotExist());
    } else {
      errorInternalError(res, error);
    }
  }
};

export const createProduct = async function createProduct(req, res) {
  const requestErrors = validateRequest(req, 'body');

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const invalidProductErrors = validateProduct(req.body);

  if (invalidProductErrors.length) {
    errorBadRequest(res, invalidProductErrors);
    return;
  }


  const product = {
    ...req.body,
    owner: req.user.id,
  };

  try {
    const addedProduct = await addProduct(product);
    const transformedProduct = await transformProduct(req, addedProduct);

    res.location(`/api/products/${transformedProduct.id}`);
    sendJsonResponse(res, 201, transformedProduct);
  } catch (error) {
    errorInternalError(error);
  }
};

export const updateOneProduct = async function updateOneProduct(req, res) {
  const requestErrors = validateRequest(req, 'body');

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { productId } = req.params;
  const product = req.body;

  const invalidProductErrors = validateProduct(product);

  if (invalidProductErrors.length) {
    errorBadRequest(res, invalidProductErrors);
    return;
  }

  try {
    await getProductById(productId);

    const updatedProduct = await updateProduct(product);
    const transformedProduct = await transformProduct(req, updatedProduct);

    sendJsonResponse(res, 200, transformedProduct);
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const deleteOneProduct = async function deleteOneProduct(req, res) {
  const { productId } = req.params;

  try {
    await getProductById(productId);
    await deleteProduct(productId);

    sendJsonResponse(res, 204, null);
  } catch (error) {
    errorInternalError(res, error);
  }
};
