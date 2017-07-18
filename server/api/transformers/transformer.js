import {pick} from "lodash/object";
import {intersection} from "lodash/array";

const extractFields = req => req.query.fields ? req.query.fields.split(",") : void 0;

const getSelectedFields = (object, fields) => {
  if (fields) {
    const fieldsInObject = intersection(Object.keys(object), fields);

    return fieldsInObject.length ? pick(object, fieldsInObject) : object;
  }

  return object;
};

export const transform = (req, resource, transformation) => {
  const fields = extractFields(req);

  return getSelectedFields(transformation(req, resource), fields);
};