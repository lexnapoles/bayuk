import parse from "parse-link-header";
import {normalize} from "normalizr";
import * as schema from "../actions/schema";
import {CALL_API, getJSON} from "redux-api-middleware";
import queryString from "query-string";
import {
	FETCH_PRODUCTS,
	FETCH_USERS,
	FETCH_ONE_PRODUCT,
	SEARCH_PRODUCTS,
	FETCH_ONE_USER,
	FETCH_CURRENT_USER,
	FETCH_CATEGORIES,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	REGISTER_USER,
	LOGIN_USER
} from "../constants/actionTypes";

const apiBaseUrl = `http://localhost:3000/api`;

const stringifyQueryParams = params => Object.keys(params).length ? `?${queryString.stringify(params)}` : "";

const getTypes = ({request, success, failure}) => [request, success, failure];

const processBody = schema => (action, state, res) =>
	getJSON(res)
		.then((json) => normalize(json, schema));

const processHeader = (action, state, res) => ({
	nextPageUrl: parse(res.headers.get("Link")).next.url
});

const processResponse = (processors = []) =>
	(action, state, res) =>
		processors.reduce((promise, processor) => {
			let payload = void 0;

			return promise
				.then(previousPayload => payload = previousPayload)
				.then(() => processor(action, state, res))
				.then(processedData => ({
					...payload,
					...processedData
				}))
		}, Promise.resolve({}));

export const fetchCategories = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/categories`,
		method:   "GET",
		types:    getTypes(FETCH_CATEGORIES)
	}
});

export const fetchProducts = (params = {}) => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products${stringifyQueryParams(params)}`,
		method:   "GET",
		types:    [
			FETCH_PRODUCTS.request,
			{
				type:    FETCH_PRODUCTS.success,
				payload: processResponse([processHeader, processBody(schema.arrayOfProducts)])
			},
			FETCH_PRODUCTS.failure
		]
	}
});

export const searchProducts = (params = {}) => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products${stringifyQueryParams(params)}`,
		method:   "GET",
		types:    [
			SEARCH_PRODUCTS.request,
			{
				type:    SEARCH_PRODUCTS.success,
				payload: processResponse([processHeader, processBody(schema.arrayOfProducts)])
			},
			SEARCH_PRODUCTS.failure
		]
	}
});

export const fetchOneProduct = (productId, params = {}) => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}${stringifyQueryParams(params)}`,
		method:   "GET",
		types:    getTypes(FETCH_ONE_PRODUCT)
	}
});

export const addProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  ({currentUser}) => ({
			"Content-type":  "application/json",
			"Authorization": `Bearer ${currentUser.token}`
		}),
		method:   "POST",
		body:     JSON.stringify(product),
		types:    getTypes(ADD_PRODUCT)
	}
});

export const deleteProduct = productId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}`,
		headers:  ({currentUser}) => ({"Authorization": `Bearer ${currentUser.token}`}),
		method:   "DELETE",
		types:    getTypes(DELETE_PRODUCT)
	}
});

export const updateProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  ({currentUser}) => ({
			"Content-type":  "application/json",
			"Authorization": `Bearer ${currentUser.token}`
		}),
		method:   "PUT",
		body:     JSON.stringify(product),
		types:    getTypes(UPDATE_PRODUCT)
	}
});

export const registerUser = user => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/register`,
		headers:  {"Content-type": "application/json"},
		method:   "POST",
		body:     JSON.stringify(user),
		types:    getTypes(REGISTER_USER)
	}
});

export const logInUser = user => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/login`,
		headers:  {"Content-type": "application/json"},
		method:   "POST",
		body:     JSON.stringify(user),
		types:    getTypes(LOGIN_USER)
	}
});

export const fetchUsers = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/users`,
		method:   "GET",
		types:    [
			FETCH_USERS.request,
			{
				type:    FETCH_USERS.success,
				payload: processResponse([processHeader, processBody(schema.arrayOfUsers)])
			},
			FETCH_USERS.failure
		]
	}
});

export const fetchOneUser = userId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/users/${userId}`,
		method:   "GET",
		types:    getTypes(FETCH_ONE_USER)
	}
});

export const fetchCurrentUser = userId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/users/${userId}`,
		method:   "GET",
		types:    getTypes(FETCH_CURRENT_USER)
	}
});