import { CALL_API } from 'redux-api-middleware';
import * as schema from '../actions/schema';

import {
  FETCH_PRODUCTS,
  FETCH_USERS,
  FETCH_ONE_PRODUCT,
  FETCH_ONE_USER,
  FETCH_CURRENT_USER,
  FETCH_CATEGORIES,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  REGISTER_USER,
  LOGIN_USER,
  FETCH_PRODUCTS_SOLD, FETCH_PRODUCTS_ON_SELL,
  FETCH_REVIEWS,
} from '../constants/actionTypes';

import {
  getApiFullUrl,
  processBody,
  processHeader,
  processResponse,
  stringifyQueryParams,
} from './apiHelpers';

const API_ROOT = 'http://localhost:3000/api';

const getTypes = ({ request, success, failure }) => [request, success, failure];

export const fetchCategories = endpoint => ({
  [CALL_API]: {
    endpoint: getApiFullUrl(endpoint),
    method: "GET",
    types: getTypes(FETCH_CATEGORIES)
  }
});

const fetchProducts = (endpoint, params, types) => ({
  [CALL_API]: {
    endpoint: `${getApiFullUrl(endpoint)}${stringifyQueryParams(params)}`,
    method: "GET",
    types
  }
});

export const fetchProductsByFilter = (endpoint, params = {}, filter) => {
  const meta = filter ? { filter } : undefined;

  const types = [
    {
      type: FETCH_PRODUCTS.request,
      meta
    },
    {
      type: FETCH_PRODUCTS.success,
      payload: processResponse([
        processHeader,
        processBody(schema.arrayOfProducts)
      ]),
      meta
    },
    {
      type: FETCH_PRODUCTS.failure,
      meta
    }
  ];

  return fetchProducts(endpoint, params, types);
};

export const fetchProductsSoldByUser = (endpoint, params = {}, user) => {
  const meta = user ? { user } : undefined;

  const types = [
    {
      type: FETCH_PRODUCTS_SOLD.request,
      meta
    },
    {
      type: FETCH_PRODUCTS_SOLD.success,
      payload: processResponse([
        processHeader,
        processBody(schema.arrayOfProducts)
      ]),
      meta
    },
    {
      type: FETCH_PRODUCTS_SOLD.failure,
      meta
    }
  ];

  return fetchProducts(endpoint, params, types);
};

export const fetchProductsOnSellByUser = (endpoint, params = {}, user) => {
  const meta = user ? { user } : undefined;

  const types = [
    {
      type: FETCH_PRODUCTS_ON_SELL.request,
      meta
    },
    {
      type: FETCH_PRODUCTS_ON_SELL.success,
      payload: processResponse([
        processHeader,
        processBody(schema.arrayOfProducts)
      ]),
      meta
    },
    {
      type: FETCH_PRODUCTS_ON_SELL.failure,
      meta
    }
  ];

  return fetchProducts(endpoint, params, types);
};

export const fetchOneProduct = (endpoint, params = {}) =>
  fetchProducts(endpoint, params, getTypes(FETCH_ONE_PRODUCT));

export const addProduct = product => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/products`,
    headers: ({ currentUser }) => ({
      "Content-type": "application/json",
      Authorization: `Bearer ${currentUser.token}`
    }),
    method: "POST",
    body: JSON.stringify(product),
    types: getTypes(ADD_PRODUCT)
  }
});

export const deleteProduct = productId => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/products/${productId}`,
    headers: ({ currentUser }) => ({
      Authorization: `Bearer ${currentUser.token}`
    }),
    method: "DELETE",
    types: getTypes(DELETE_PRODUCT)
  }
});

export const updateProduct = product => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/products`,
    headers: ({ currentUser }) => ({
      "Content-type": "application/json",
      Authorization: `Bearer ${currentUser.token}`
    }),
    method: "PUT",
    body: JSON.stringify(product),
    types: getTypes(UPDATE_PRODUCT)
  }
});

export const registerUser = user => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/register`,
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(user),
    types: getTypes(REGISTER_USER)
  }
});

export const logInUser = user => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/login`,
    headers: { "Content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(user),
    types: getTypes(LOGIN_USER)
  }
});

export const fetchUsers = () => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/users`,
    method: "GET",
    types: [
      FETCH_USERS.request,
      {
        type: FETCH_USERS.success,
        payload: processResponse([
          processHeader,
          processBody(schema.arrayOfUsers)
        ])
      },
      FETCH_USERS.failure
    ]
  }
});

export const fetchOneUser = userId => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/users/${userId}`,
    method: "GET",
    types: getTypes(FETCH_ONE_USER)
  }
});

export const fetchCurrentUser = userId => ({
  [CALL_API]: {
    endpoint: `${API_ROOT}/users/${userId}`,
    method: "GET",
    types: getTypes(FETCH_CURRENT_USER)
  }
});

export const fetchReviews = (endpoint, params, user) => {
  const meta = user ? { user } : undefined;

  return ({
    [CALL_API]: {
      endpoint: `${getApiFullUrl(endpoint)}${stringifyQueryParams(params)}`,
      method: 'GET',
      types: [
        {
          type: FETCH_REVIEWS.request,
          meta,
        },
        {
          type: FETCH_REVIEWS.success,
          payload: processResponse([processHeader, processBody(schema.arrayOfReviews)]),
          meta,
        },
        {
          type: FETCH_REVIEWS.failure,
          meta,
        },
      ],
    },
  });
};
