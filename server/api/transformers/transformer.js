import { pick } from "lodash/object";

export const extractFields = (req, fieldsProp) =>
  req.query[fieldsProp] ? req.query[fieldsProp].split(",") : undefined;

const getSelectedFields = (object, fields = []) =>
  fields.length ? pick(object, fields) : object;

export const collection = (arr, transformer) => {
  const transformItems = arr.map(item => transformer(item));

  return Promise.all(transformItems);
};

export const item = (obj, transformer) => transformer(obj);

export default (req, resource, transformation = () => resource) => {
  const fields = extractFields(req, "fields");

  return getSelectedFields(transformation(resource, req), fields);
};
