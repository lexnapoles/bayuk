import {ADD_PRODUCT, NEW_SEARCH} from "../constants/actionTypes";
import {fetchProductsByDistance, fetchOneProduct, fetchSearchedProduct} from "./api";
import {getProductsByDistancePagination, getSearchedProductsPagination, getProductById} from "../reducers/root";

export const addProduct = (product) => ({
  type:    ADD_PRODUCT,
  payload: {product}
});

export const loadProductsByDistance = (params, nextPage) => (dispatch, getState) => {
  const {
          nextPageUrl = "products",
          pageCount   = 0
        } = getProductsByDistancePagination(getState()) || {};

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchProductsByDistance(nextPageUrl, params));
};

export const loadSearchedProducts = (params, nextPage) => (dispatch, getState) => {
  const {
          nextPageUrl = "products",
          pageCount   = 0
        } = getSearchedProductsPagination(getState()) || {};

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchSearchedProduct(nextPageUrl, params));
};

export const loadProduct = (id, params) => (dispatch, getState) => {
  const product = getProductById(getState(), id);

  if (product) {
    return null;
  }

  return dispatch(fetchOneProduct(`products/${id}`, params));
};

export const newSearch = () => ({
  type: NEW_SEARCH
});