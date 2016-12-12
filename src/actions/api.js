import {CALL_API} from "redux-api-middleware";
import {SET_PRODUCTS, SET_CATEGORIES} from "../constants/actionTypes";

const apiBaseUrl = `http://localhost:3000/api`;

export const fetchCategories = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/categories`,
		method: "GET",
		types: ["REQUEST", SET_CATEGORIES, "FAILURE"]

	}
});

export const fetchProducts = () => ({
	[CALL_API]: {
		endpoint: `${apiBaseUrl}/products`,
		method: "GET",
		types: ["REQUEST", SET_PRODUCTS, "FAILURE"]
	}
});