import {union} from "lodash/array";
import {combineReducers} from "redux";
import {FETCH_PRODUCTS, FETCH_ONE_PRODUCT, SEARCH_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";
import createFetchingReducer from "./isFetching";

const byId = (state = {}, action) => {
	switch (action.type) {
		case FETCH_ONE_PRODUCT.success:
		case ADD_PRODUCT.success:
			return {
				...state,
				[action.payload.id]: product(void 0, action)
			};

		case FETCH_PRODUCTS.success:
			return {
				...state,
				...action.payload.entities.products
			};

		case SEARCH_PRODUCTS.success:
			return action.payload.entities.products || {};

		default:
			return state;
	}
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case FETCH_ONE_PRODUCT.success:
		case ADD_PRODUCT.success:
			return union(state, [action.payload.id]);

		case FETCH_PRODUCTS.success:
			return union(state, action.payload.result);

		case SEARCH_PRODUCTS.success:
			return action.payload.result;

		default:
			return state;
	}
};

export default combineReducers({
	byId,
	allIds,
	isFetching: createFetchingReducer([FETCH_PRODUCTS.request, FETCH_ONE_PRODUCT.request, SEARCH_PRODUCTS.request], [FETCH_PRODUCTS.success, FETCH_ONE_PRODUCT.success, SEARCH_PRODUCTS.success])
});