import { browserHistory } from "react-router";
import { ADD_PRODUCT } from "../constants/actionTypes";

const addProductMiddleware = () => next => action => {
  switch (action.type) {
    case ADD_PRODUCT.success: {
      next(action);
      browserHistory.push(`/product/${action.payload.id}`);
      break;
    }

    default:
      next(action);
  }
};

export default addProductMiddleware;
