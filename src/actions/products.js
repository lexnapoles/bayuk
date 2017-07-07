import {ADD_PRODUCT} from "../constants/actionTypes";
import {fetchProducts, fetchOneProduct} from "./api";
import {getAllProducts, getProductById} from "../reducers/root";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload: {product}
});

export const loadProducts = params => (dispatch, getState) => {
	const products = getAllProducts(getState()).items;

	if (products.length) {
		return null;
	}

	return dispatch(fetchProducts(params));
};

export const loadProduct = (id, params) => (dispatch, getState) => {
	const product = getProductById(getState(), id).item;

	if (product) {
		return null;
	}

	return dispatch(fetchOneProduct(id, params));
};

