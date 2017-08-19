import { fetchOneUser } from './api';
import { getUserById } from '../reducers/root';

export default userId => (dispatch, getState) => {
  const user = getUserById(getState(), userId);

  if (user) {
    return null;
  }

  return dispatch(fetchOneUser(userId));
};
