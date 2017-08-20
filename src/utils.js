import { isEmpty } from 'lodash/lang';
import { findKey } from 'lodash/object';

export const createDefaultObjectFrom = (base = {}, defaultValue = '') => {
  const keys = Array.isArray(base)
    ? base
    : Object.keys(base);

  return keys.reduce((obj, key) => ({
    ...obj,
    [key]: defaultValue,
  }), {});
};

export const isNotEmpty = value => !isEmpty(value);

export const getJwtPayload = (jwt) => {
  const sections = jwt.split('.');

  return JSON.parse(atob(sections[1]));
};

export const isCheckBoxChecked = values => findKey(values, value => value);
