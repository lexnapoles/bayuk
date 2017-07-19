import {sendJsonResponse} from "../../../utils";
import {getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../../services/products";
import {transformProduct} from "../../transformers/products";
import {productDoesNotExist} from "../../../errors/api/productErrors";
import dbErrors from "../../../errors/database";
import {validateRequest, validateId} from "../validators";
import {validateProduct} from "./validators"
import getFilters from "./getFilters";
import addPaginationLink from "./addPaginationLink";
import {errorBadRequest, errorNotFound, errorInternalError} from "../../../errors/api/errors";


export const readProducts = (req, res) => {
  const {filters, errors} = getFilters(req);

  if (errors.length) {
    errorBadRequest(res, errors);
    return;
  }

  getProducts(filters)
    .then(products => products.map(transformProduct.bind(void 0, req)))
    .then(products => {
      if (products.length) {
        addPaginationLink(req, res, products, req.query);
      }

      sendJsonResponse(res, 200, products);
    })
    .catch(error => errorInternalError(res, error));
};

export const readOneProduct = (req, res) => {
  const requestErrors = [
    ...validateRequest(req, "params"),
    ...validateRequest(req.params, "productId")
  ];

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const {productId} = req.params;

  const invalidIdError = validateId(productId);

  if (invalidIdError.length) {
    errorBadRequest(res, invalidIdError);
    return;
  }

  getProductById(productId)
    .then(transformProduct.bind(void 0, req))
    .then(product => sendJsonResponse(res, 200, product))
    .catch(error => {
      if (error.code === dbErrors.dataNotFound) {
        errorNotFound(res, productDoesNotExist());
        return;
      }

      errorInternalError(res, error);
    });
};

export const createProduct = (req, res) => {
  const requestErrors = validateRequest(req, "body");

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
    owner: req.user.id
  };

  addProduct(product)
    .then(transformProduct.bind(void 0, req))
    .then(product => {
      res.location(`/api/products/${product.id}`);
      sendJsonResponse(res, 201, product)
    })
    .catch(error => errorInternalError(error));
};

export const updateOneProduct = (req, res) => {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const {productId} = req.params,
        product     = req.body;

  const invalidProductErrors = validateProduct(product);

  if (invalidProductErrors.length) {
    errorBadRequest(res, invalidProductErrors);
    return;
  }

  return getProductById(productId)
    .then(() => updateProduct(product))
    .then(transformProduct.bind(void 0, req))
    .then(product => sendJsonResponse(res, 200, product))
    .catch(error => errorInternalError(res, error));
};

export const deleteOneProduct = (req, res) => {
  const {productId} = req.params;

  return getProductById(productId)
    .then(() => deleteProduct(productId))
    .then(() => sendJsonResponse(res, 204, null))
    .catch(error => errorInternalError(res, error));
};