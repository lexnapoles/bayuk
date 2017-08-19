import { has } from 'lodash/object';
import { isEmpty } from 'lodash/lang';
import validateUUID from 'uuid-validate';
import { dataNotFound, invalidId } from '../../errors/api/controllerErrors';

const validateObject = (obj, properties = [], validator, error) => {
  if (!Array.isArray(properties)) {
    properties = [properties];
  }

  return properties.reduce(
    (errorMessages, property) =>
      (validator(obj, property)
        ? [...errorMessages, error(property)]
        : errorMessages)
    , []);
};

export const validateRequest = (req, fields) =>
  validateObject(
    req,
    fields,
    (request, field) => !has(request, field) || isEmpty(request[field]),
    dataNotFound);

export const validateId = id => (validateUUID(id) ? [] : [invalidId()]);
