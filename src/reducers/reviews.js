import { union } from "lodash/array";
import { combineReducers } from "redux";
import { FETCH_REVIEWS } from "../constants/actionTypes";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REVIEWS.success:
      return {
        ...state,
        ...action.payload.entities.reviews
      };

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_REVIEWS.success:
      return union(state, action.payload.result);

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});
