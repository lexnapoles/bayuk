import {combineReducers} from "redux";
import {FETCH_CATEGORIES} from "../constants/actionTypes";
import createFetchingReducer from "./isFetching";

const categories = (state = [], action) => {
	switch (action.type) {
		case FETCH_CATEGORIES.success:
			return action.payload;

		default:
			return state;
	}
};

export default combineReducers({
	items:      categories,
	isFetching: createFetchingReducer([FETCH_CATEGORIES.request], [FETCH_CATEGORIES.success])
});

export const getCategories = ({items, isFetching}) => ({
	items,
	isFetching
});
