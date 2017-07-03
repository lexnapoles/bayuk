const asyncActionTypes = actionName => ({
	request: `${actionName}_REQUEST`,
	success: `${actionName}_SUCCESS`,
	failure: `${actionName}_FAILURE`
});

export const ADD_PRODUCT = asyncActionTypes("ADD_PRODUCT");
export const FETCH_PRODUCTS = asyncActionTypes("FETCH_PRODUCTS");
export const FETCH_ONE_PRODUCT = asyncActionTypes("FETCH_ONE_PRODUCT");
export const DELETE_PRODUCT = asyncActionTypes("DELETE_PRODUCT");
export const UPDATE_PRODUCT = asyncActionTypes("UPDATE_PRODUCT");
export const FETCH_CATEGORIES = asyncActionTypes("FETCH_CATEGORIES");
export const REGISTER_USER = asyncActionTypes("REGISTER_USER");
export const LOGIN_USER = asyncActionTypes("LOGIN_USER");
export const FETCH_USERS = asyncActionTypes("FETCH_USERS");
export const FETCH_ONE_USER = asyncActionTypes("FETCH_ONE_USER");

export const UPDATE_GEOLOCATION = "UPDATE_GEOLOCATION";
