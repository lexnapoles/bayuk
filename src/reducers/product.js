import { FETCH_ONE_PRODUCT, ADD_PRODUCT } from '../constants/actionTypes';

const product = (state, action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT.success:
    case ADD_PRODUCT.success:
      return { ...action.payload };

    default:
      return state;
  }
};

export default product;
