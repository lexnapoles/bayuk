import { getUserById } from '../../services/users';
import { getProductById } from '../../services/products';
import transformUser from '../users';
import transformProduct from '../products';
import { item } from '../transformer';

const getUserFromReview = (req, id) =>
  getUserById(id)
    .then(user => item(user, transformUser.bind(null, req)));

const getProductFromReview = (req, id) =>
  getProductById(id)
    .then(product => item(product, transformProduct.bind(null, req)));

export default {
  target: (req, { target_id }) => getUserFromReview(req, target_id),
  source: (req, { source_id }) => getUserFromReview(req, source_id),
  product: (req, { product_id }) => getProductFromReview(req, product_id),
};
