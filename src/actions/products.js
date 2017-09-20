import { ADD_PRODUCT, NEW_SEARCH } from '../constants/actionTypes';
import {
  fetchOneProduct, fetchProductsByFilter, fetchProductsOnSellByUser,
  fetchProductsSoldByUser,
} from './api';
import {
  getProductById, getProductsByFilter, getProductsOnSellByUser,
  getProductsSoldByUser,
} from '../reducers/root';
import { CUSTOM_FILTER, DISTANCE_FILTER } from '../constants/productFilters';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: { product },
});

export const loadProductsByFilter = (filter, params, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = 'products',
    pageCount = 0,
  } = getProductsByFilter(getState(), filter) || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchProductsByFilter(nextPageUrl, params, filter));
};

export const loadProductsByDistance = (params, nextPage) =>
  loadProductsByFilter(params, nextPage, DISTANCE_FILTER);

export const loadSearchedProducts = (params, nextPage) =>
  loadProductsByFilter(params, nextPage, CUSTOM_FILTER);

export const loadProductsSoldByUser = (user, params, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = 'products',
    pageCount = 0,
  } = getProductsSoldByUser(getState(), user) || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchProductsSoldByUser(nextPageUrl, params, user));
};

export const loadProductsOnSellByUser = (user, params, nextPage) => (dispatch, getState) => {
  console.log('on sell');
  const {
    nextPageUrl = 'products',
    pageCount = 0,
  } = getProductsOnSellByUser(getState(), user) || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchProductsOnSellByUser(nextPageUrl, params, user));
};

export const loadProduct = (id, params) => (dispatch, getState) => {
  const product = getProductById(getState(), id);

  if (product) {
    return null;
  }

  return dispatch(fetchOneProduct(`products/${id}`, params));
};

export const newSearch = filter => ({
  type: NEW_SEARCH,
  meta: {
    filter,
  },
});

