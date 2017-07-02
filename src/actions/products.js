import {ADD_PRODUCT} from "../constants/actionTypes";
import {fetchProducts, fetchOneProduct} from "./api";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload: {product}
});

export const loadProducts = params => (dispatch, getState) => {
	const MINIMUM_PRODUCTS = 10,
				products         = getState().entities.products.allIds;

	if (products && products.length >= MINIMUM_PRODUCTS) {
		return null;
	}

	return dispatch(fetchProducts(params));
};

export const loadProduct = (id, params) => (dispatch, getState) => {
	const product = getState().entities.products.byId[id];

	if (product) {
		return null;
	}

	return dispatch(fetchOneProduct(id, params));
};

