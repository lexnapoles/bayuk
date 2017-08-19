import { fetchCategories } from './api';
import { getAllCategories } from '../reducers/root';

export default () => (dispatch, getState) => {
  const categories = getAllCategories(getState());

  if (categories && categories.length) {
    return null;
  }

  return dispatch(fetchCategories('categories'));
};
