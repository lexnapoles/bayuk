import {normalize} from "normalizr";
import * as schema from "../actions/schema";
import {CALL_API, getJSON} from "redux-api-middleware";
import {
	FETCH_PRODUCTS,
	FETCH_USERS,
	FETCH_CATEGORIES,
	FETCH_ONE_PRODUCT,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	REGISTER_USER,
	LOGIN_USER
} from "../constants/actionTypes";

const apiBaseUrl = `http://localhost:3000/api`;

const normalizeResponse = schema => (action, state, res) => getJSON(res).then((json) => normalize(json, schema));

const getTypes = asynAction => [asynAction.request, asynAction.success, asynAction.failure];

export const fetchCategories = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/categories`,
		method:   "GET",
		types:    getTypes(FETCH_CATEGORIES)
	}
});

export const fetchProducts = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		method:   "GET",
		types:    [
			FETCH_PRODUCTS.request,
			{
				type:    FETCH_PRODUCTS.success,
				payload: normalizeResponse(schema.arrayOfProducts)
			},
			FETCH_PRODUCTS.failure
		]
	}
});

export const fetchOneProduct = productId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}`,
		method:   "GET",
		types:    getTypes(FETCH_ONE_PRODUCT)
	}
});

export const addProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  ({user}) => ({
			"Content-type":  "application/json",
			"Authorization": `Bearer ${user.token}`
		}),
		method:   "POST",
		body:     JSON.stringify(product),
		types:    getTypes(ADD_PRODUCT)
	}
});

export const deleteProduct = productId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}`,
		headers:  ({user}) => ({"Authorization": `Bearer ${user.token}`}),
		method:   "DELETE",
		types:    getTypes(DELETE_PRODUCT)
	}
});

export const updateProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  ({user}) => ({
			"Content-type":  "application/json",
			"Authorization": `Bearer ${user.token}`
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
				payload: normalizeResponse(schema.arrayOfUsers)
			},
			FETCH_USERS.failure
		]
	}
});