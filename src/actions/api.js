import {normalize} from "normalizr";
import * as schema from "../actions/schema";
import {CALL_API, getJSON} from "redux-api-middleware";
import {SET_PRODUCTS, SET_CATEGORIES, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from "../constants/actionTypes";

const apiBaseUrl = `http://localhost:3000/api`;

const normalizeResponse = schema => (action, state, res) => getJSON(res).then((json) => normalize(json, schema));

export const fetchCategories = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/categories`,
		method:   "GET",
		types:    ["REQUEST", SET_CATEGORIES, "FAILURE"]
	}
});

export const fetchProducts = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		method:   "GET",
		types:    [
			"REQUEST", {
				type:    SET_PRODUCTS,
				payload: normalizeResponse(schema.arrayOfProducts)
			}, "FAILURE"]
	}
});

export const fetchOneProduct = productId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}`,
		method:   "GET",
		types:    ["REQUEST", ADD_PRODUCT, "FAILURE"]
	}
});

export const addProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  {"Content-type": "application/json"},
		method:   "POST",
		body:     JSON.stringify(product),
		types:    ["REQUEST", ADD_PRODUCT, "FAILURE"]
	}
});

export const deleteProduct = productId => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products/${productId}`,
		method:   "DELETE",
		types:    ["REQUEST", DELETE_PRODUCT, "FAILURE"]
	}
});

export const updateProduct = product => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		headers:  {"Content-type": "application/json"},
		method:   "PUT",
		body:     JSON.stringify(product),
		types:    ["REQUEST", UPDATE_PRODUCT, "FAILURE"]
	}
});
