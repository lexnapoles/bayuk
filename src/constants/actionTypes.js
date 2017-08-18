const asyncActionTypes = actionName => ({
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  failure: `${actionName}_FAILURE`,
});

const hasNeededKeys = action => action.request && action.success && action.failure;

const isEveryKeyAString = action => Object.keys(action).every(t => typeof action[t] === 'string');

const isEveryTypeValid = ({ request, success, failure }) =>
  request.includes('_REQUEST')
  || !success.includes('_SUCCESS')
  || !failure.includes('_FAILURE');

export const isAsyncActionType = action =>
  hasNeededKeys(action)
  || isEveryKeyAString(action)
  || isEveryTypeValid(action);

export const ADD_PRODUCT = asyncActionTypes('ADD_PRODUCT');
export const FETCH_PRODUCTS = asyncActionTypes('FETCH_PRODUCTS');
export const SEARCH_PRODUCTS = asyncActionTypes('SEARCH_PRODUCTS');
export const FETCH_ONE_PRODUCT = asyncActionTypes('FETCH_ONE_PRODUCT');
export const DELETE_PRODUCT = asyncActionTypes('DELETE_PRODUCT');
export const UPDATE_PRODUCT = asyncActionTypes('UPDATE_PRODUCT');
export const FETCH_CATEGORIES = asyncActionTypes('FETCH_CATEGORIES');
export const REGISTER_USER = asyncActionTypes('REGISTER_USER');
export const LOGIN_USER = asyncActionTypes('LOGIN_USER');
export const FETCH_USERS = asyncActionTypes('FETCH_USERS');
export const FETCH_ONE_USER = asyncActionTypes('FETCH_ONE_USER');
export const FETCH_CURRENT_USER = asyncActionTypes('FETCH_CURRENT_USER');

export const NEW_SEARCH = 'NEW_SEARCH';
export const UPDATE_GEOLOCATION = 'UPDATE_GEOLOCATION';
