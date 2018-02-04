import { fetchReviews } from './api';
import { getUserById } from '../reducers/root';

export const loadReviews = (userId, params) => (dispatch, getState) => {
  const product = getUserById(getState(), userId);

  if (product) {
    return null;
  }

  return dispatch(fetchReviews(`reviews/${userId}`, params));
};
