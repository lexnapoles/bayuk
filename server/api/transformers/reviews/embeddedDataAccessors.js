import { getUserById } from '../../services/users';
import transformUser from '../users';
import { item } from '../transformer';

const getUserFromReview = (req, id) =>
  getUserById(id)
    .then(user => item(user, transformUser.bind(null, req)));

export default {
  target: (req, { target }) => getUserFromReview(req, target),
  source: (req, { source }) => getUserFromReview(req, source),
};
