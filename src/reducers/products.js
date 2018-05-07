import { union } from "lodash/array";
import { combineReducers } from "redux";
import {
  FETCH_PRODUCTS,
  FETCH_ONE_PRODUCT,
  ADD_PRODUCT,
  FETCH_PRODUCTS_ON_SELL,
  FETCH_PRODUCTS_SOLD
} from "../constants/actionTypes";
import product from "./product";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT.success:
    case ADD_PRODUCT.success:
      return {
        ...state,
        [action.payload.id]: product(undefined, action)
      };

    case FETCH_PRODUCTS.success:
    case FETCH_PRODUCTS_ON_SELL.success:
    case FETCH_PRODUCTS_SOLD.success:
      return {
        ...state,
        ...action.payload.entities.products
      };

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT.success:
    case ADD_PRODUCT.success:
      return union(state, [action.payload.id]);

    case FETCH_PRODUCTS.success:
    case FETCH_PRODUCTS_ON_SELL.success:
    case FETCH_PRODUCTS_SOLD.success:
      return union(state, action.payload.result);

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});
