import { fetchReviews } from "./api";
import { getReviews } from "../reducers/root";

export const loadReviews = (userId, params, nextPage) => (
  dispatch,
  getState
) => {
  const { nextPageUrl = `reviews/${userId}`, pageCount = 0 } =
    getReviews(getState(), userId) || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchReviews(nextPageUrl, params, userId));
};
