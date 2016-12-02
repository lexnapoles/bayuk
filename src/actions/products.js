import {ADD_PRODUCT, SET_PRODUCTS, API} from "../constants/actionTypes";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload:  {product}
});

export const fetchProducts = () => ({
	type: API,
	payload: {
		url: '/products',
		success: SET_PRODUCTS
	}
});