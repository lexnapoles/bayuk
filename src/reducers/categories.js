import {combineReducers} from "redux";
import {FETCH_CATEGORIES, SET_CATEGORIES} from "../constants/actionTypes";
import createFetchingReducer from "./isFetching";

const categories = (state = [], action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return action.payload;

		default:
			return state;
	}
};

export default combineReducers({
	items: categories,
	isFetching: createFetchingReducer(FETCH_CATEGORIES, SET_CATEGORIES)
});

