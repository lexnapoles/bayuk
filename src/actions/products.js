import {ADD_PRODUCT} from "../constants/actionTypes";
import {fetchProducts, fetchOneProduct} from "./api";
import {getProductsByDistancePagination, getProductById} from "../reducers/root";

export const addProduct = (product) => ({
	type:    ADD_PRODUCT,
	payload: {product}
});

export const loadProductsByDistance = (params, nextPage) => (dispatch, getState) => {
	const {pageCount} = getProductsByDistancePagination(getState()) || {};

	if (pageCount > 0 && !nextPage) {
		return null
	}

	return dispatch(fetchProducts("products", params));
};

export const loadProduct = (id, params) => (dispatch, getState) => {
	const product = getProductById(getState(), id);

	if (product) {
		return null;
	}

	return dispatch(fetchOneProduct(`products/${id}`, params));
};