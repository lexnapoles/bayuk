import {pick} from "lodash/object";
import {intersection} from "lodash/array";

export const getBaseUrl = req => `${req.protocol}://${req.headers.host}`;

export const extractFields = req => req.query.fields ? req.query.fields.split(",") : void 0;

export const getSelectedFields = (object, fields) => {
  if (fields) {
    const fieldsInObject = intersection(Object.keys(object), fields);

    return fieldsInObject.length ? pick(object, fieldsInObject) : object;
  }

  return object;
};