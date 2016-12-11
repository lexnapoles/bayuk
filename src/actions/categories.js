import {API, SET_CATEGORIES} from "../constants/actionTypes";

export const fetchCategories = () => ({
	type: API,
	payload: {
		url:     '/categories',
		success: SET_CATEGORIES
	}
});