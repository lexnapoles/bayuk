import {API, ADD_PRODUCT, SET_PRODUCTS, SET_CATEGORIES} from "../constants/actionTypes";

export const fetchCategories = () => ({
	type: API,
	payload: {
		url:     '/categories',
		success: SET_CATEGORIES
	}
});

export const fetchProducts = () => ({
	type: API,
	payload: {
		url: '/products',
		success: SET_PRODUCTS
	}
});

export const addProduct = (product) => ({
	type: API,
	payload: {
		url: '/product',
		product,
		success: ADD_PRODUCT
	}
});
