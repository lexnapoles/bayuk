import { merge } from 'lodash/object';
import transform, { extractFields, item } from './transformer';
import { getUserById } from '../services/users';
import transformUser from '../transformers/users';

const getUserFromReview = (req, id) =>
  getUserById(id)
    .then(user => item(user, transformUser(req, user)));

const defaultEmbeddedDataAccessors = {
  target: (req, { target }) => getUserFromReview(req, target),
  source: (req, { source }) => getUserFromReview(req, source),
};

const areValidFields = (fields = []) => {
  const accessors = Object.keys(defaultEmbeddedDataAccessors);

  return fields.every(field => accessors.includes(field));
};

export const extractIncludeFields = (req) => {
  const fields = extractFields(req, 'include');

  return areValidFields(fields) ? fields : undefined;
};

async function getFields(req, fields, review, embeddedDataAccessors) {
  const target = await embeddedDataAccessors.target(req, review);

  return {
    users: [target],
  };

  // const fetchAllFields = fields.map(field => fetchField(req, field, review, embeddedDataAccessors));

  // return Promise.all(fetchAllFields)
  //   .then(embeddedData => merge(...embeddedData));
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

export default async function (req, review, embeddedDataAccessors = defaultEmbeddedDataAccessors) {
  const includeFields = extractIncludeFields(req);
  const transformedReview = await transform(req, review, transformation);

  if (includeFields) {
    const embeddedData = await getFields(req, includeFields, review, embeddedDataAccessors);

    return {
      ...transformedReview,
      ...embeddedData,
    };
  }

  return transformedReview;
}
