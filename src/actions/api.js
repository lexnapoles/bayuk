import {normalize} from "normalizr";
import * as schema from "../actions/schema";

import {CALL_API} from "redux-api-middleware";
import {SET_PRODUCTS, SET_CATEGORIES} from "../constants/actionTypes";

const apiBaseUrl = `http://localhost:3000/api`;

const normalizeResponse = schema => (action, state, res) => {
	const contentType = res.headers.get('Content-Type');

	if (contentType && contentType.indexOf('json') !== -1) {
		return res.json().then(json => normalize(json, schema));
	}
};

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