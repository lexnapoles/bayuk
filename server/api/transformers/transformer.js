import { pick } from 'lodash/object';

const extractFields = req => (req.query.fields ? req.query.fields.split(',') : undefined);

const getSelectedFields = (object, fields = []) => (fields.length ? pick(object, fields) : object);

export default (req, resource, transformation = () => resource) => {
  const fields = extractFields(req);

  return getSelectedFields(transformation(resource, req), fields);
};
