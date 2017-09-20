import { combineReducers } from 'redux';
import paginate from './paginate';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SOLD,
  FETCH_PRODUCTS_ON_SELL,
  NEW_SEARCH,
} from '../constants/actionTypes';

export default combineReducers({
  productsByFilter: paginate({
    mapActionToKey: action => action.meta.filter,
    type: FETCH_PRODUCTS,
    reset: NEW_SEARCH,
  }),
  productsSoldByUser: paginate({
    mapActionToKey: action => action.meta.user,
    type: FETCH_PRODUCTS_SOLD,
  }),
  productsOnSellByUser: paginate({
    mapActionToKey: action => action.meta.user,
    type: FETCH_PRODUCTS_ON_SELL,
  }),

});

export const getProductsByFilter = ({ productsByFilter }, filter) => productsByFilter[filter];

export const getProductsSoldByUser = ({ productsSoldByUser }, id) => productsSoldByUser[id];

export const getProductsOnSellByUser = ({ productsOnSellByUser }, id) => productsOnSellByUser[id];
