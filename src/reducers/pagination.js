import { combineReducers } from 'redux';
import paginate from './paginate';
import { FETCH_PRODUCTS, SEARCH_PRODUCTS, NEW_SEARCH } from '../constants/actionTypes';

export default combineReducers({
  productsByDistance: paginate({ type: FETCH_PRODUCTS }),
  searchedProducts: paginate({ type: SEARCH_PRODUCTS, reset: NEW_SEARCH }),
});

export const getProductsByDistance = ({ productsByDistance }) => productsByDistance;

export const getSearchedProducts = ({ searchedProducts }) => searchedProducts;
