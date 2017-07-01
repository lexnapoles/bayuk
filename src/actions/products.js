import {ADD_PRODUCT} from "../constants/actionTypes";
import {fetchProducts} from "./api";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload:  {product}
});

export const loadProducts = params =>  (dispatch, getState) => {
	const products = getState().entities.products.allIds;

	if (products && products.length) {
		return null;
	}

	return dispatch(fetchProducts(params));
};