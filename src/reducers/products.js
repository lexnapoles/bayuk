import { union } from "lodash/array";
import { combineReducers } from "redux";
import {
  FETCH_PRODUCTS, FETCH_ONE_PRODUCT, ADD_PRODUCT,
  FETCH_PRODUCTS_ON_SELL, FETCH_PRODUCTS_SOLD, FETCH_REVIEWS,
} from '../constants/actionTypes';
import product from './product';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT.success:
    case ADD_PRODUCT.success:
      return {
        ...state,
        [action.payload.id]: product(undefined, action)
      };

    case FETCH_REVIEWS.success: {
      const { entities: { reviews = [] } } = action.payload;
      const { result: reviewsIds = [] } = action.payload;

      const nextState = reviewsIds.reduce((obj, reviewId) => {
        const { product: reviewProduct } = reviews[reviewId];

        if (reviewProduct) {
          return {
            ...obj,
            [reviewProduct.id]: product(
              undefined,
              {
                ...action,
                payload: reviewProduct,
              }),
          };
        }

        return obj;
      }, {});

      return {
        ...state,
        ...nextState,
      };
    }

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

    case FETCH_REVIEWS.success: {
      const { entities: { reviews = [] } } = action.payload;
      const { result: reviewsIds = [] } = action.payload;

      const reviewsProducts = reviewsIds.reduce((arr, id) => {
        const { product: reviewProduct } = reviews[id];

        return reviewProduct ? [...arr, reviewProduct.id] : arr;
      }, []);

      return union(state, reviewsProducts);
    }

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});
