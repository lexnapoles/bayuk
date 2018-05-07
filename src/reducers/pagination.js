import { combineReducers } from "redux";
import paginate from "./paginate";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SOLD,
  FETCH_PRODUCTS_ON_SELL,
  FETCH_REVIEWS,
  NEW_SEARCH
} from "../constants/actionTypes";

export default combineReducers({
  productsByFilter: paginate({
    mapActionToKey: action => action.meta.filter,
    type: FETCH_PRODUCTS,
    reset: NEW_SEARCH
  }),
  productsSoldByUser: paginate({
    mapActionToKey: action => action.meta.user,
    type: FETCH_PRODUCTS_SOLD
  }),
  productsOnSellByUser: paginate({
    mapActionToKey: action => action.meta.user,
    type: FETCH_PRODUCTS_ON_SELL
  }),
  reviews: paginate({
    mapActionToKey: action => action.meta.user,
    type: FETCH_REVIEWS
  })
});

export const getProductsByFilter = ({ productsByFilter }, filter) =>
  productsByFilter[filter];

export const getProductsSoldByUser = ({ productsSoldByUser }, id) =>
  productsSoldByUser[id];

export const getProductsOnSellByUser = ({ productsOnSellByUser }, id) =>
  productsOnSellByUser[id];

export const getReviews = ({ reviews }, id) => reviews[id];
