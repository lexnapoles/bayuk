import { merge } from 'lodash/object';
import transform, { extractFields, item } from './transformer';
import { getUserById } from '../services/users';
import transformUser from '../transformers/users';

const getUserFromReview = (req, id) =>
  getUserById(id)
    .then(user => item(user, transformUser(req, user)));

const fieldGetters = {
  target: (req, { target }) => getUserFromReview(req, target),
  source: (req, { source }) => getUserFromReview(req, source),
};

const areValidFields = (fields = []) => {
  const getters = Object.keys(fieldGetters);

  return fields.every(field => getters.includes(field));
};

export const extractIncludeFields = (req) => {
  const fields = extractFields(req, 'include');

  return areValidFields(fields) ? fields : undefined;
};

const fetchField = (req, field, review, embeddedDataAccessors) =>
  embeddedDataAccessors[field](req, review);

const getFields = (req, fields, review, embeddedDataAccessors) => {
  const fetchAllFields = fields.map(field => fetchField(req, field, review, embeddedDataAccessors));

  return Promise.all(fetchAllFields)
    .then(embeddedData => merge(...embeddedData));
};

const transformation = ({
  id,
  source,
  target,
  rating,
  description,
  product,
  created_at,
}) =>
  ({
    id,
    source,
    target,
    rating,
    description,
    product,
    createdAt: created_at,
  });

export default (req, review, embeddedDataAccessors = fieldGetters) => {
  const includeFields = extractIncludeFields(req);

  if (includeFields) {
    return getFields(req, includeFields, review, embeddedDataAccessors)
      .then(embeddedData => ({
        ...transform(req, review, transformation),
        ...embeddedData,
      }));
  }

  return transform(req, review, transformation);
};
