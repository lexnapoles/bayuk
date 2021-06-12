import { FETCH_CATEGORIES } from "../constants/actionTypes";

const categories = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES.success:
      return action.payload;

    default:
      return state;
  }
};

export default categories;
