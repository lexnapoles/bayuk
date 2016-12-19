const asyncActionTypes = actionName => ({
	request: `${actionName}_REQUEST`,
	success: `${actionName}_SUCCESS`,
	failure: `${actionName}_FAILURE`
});

export const FETCH_CATEGORIES = asyncActionTypes("FETCH_CATEGORIES");
export const FETCH_PRODUCTS = asyncActionTypes("FETCH_PRODUCTS");
export const ADD_PRODUCT = asyncActionTypes("ADD_PRODUCT");
export const DELETE_PRODUCT = asyncActionTypes("DELETE_PRODUCT");
export const UPDATE_PRODUCT = asyncActionTypes("UPDATE_PRODUCT");