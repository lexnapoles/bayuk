import { getUserById } from '../../services/users';
import transformUser from '../users';
import { item } from '../transformer';

const getUserFromReview = (req, id) =>
  getUserById(id)
    .then(user => item(user, transformUser.bind(null, req)));

export default {
  target: (req, { target_id }) => getUserFromReview(req, target_id),
  source: (req, { source_id }) => getUserFromReview(req, source_id),
};
