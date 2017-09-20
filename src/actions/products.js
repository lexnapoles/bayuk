import { ADD_PRODUCT, NEW_SEARCH } from '../constants/actionTypes';
import { fetchOneProduct, fetchProductsByFilter } from './api';
import { getProductById, getProductsByFilter } from '../reducers/root';
import { CUSTOM_FILTER, DISTANCE_FILTER } from '../constants/productFilters';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: { product },
});

export const loadProductsByFilter = (params, nextPage, filter) => (dispatch, getState) => {
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

