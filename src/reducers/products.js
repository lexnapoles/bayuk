import {combineReducers} from "redux";
import {FETCH_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";
import createFetchingReducer from "./isFetching";

const byId = (state = {}, action) => {
	switch (action.type) {
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

		default:
			return state;
	}
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT.success:
			return [...state, action.payload.id];

		case FETCH_PRODUCTS.success:
			return [...state, ...action.payload.result];

		default:
			return state;
	}
};

const products = combineReducers({
	byId,
	allIds,
	isFetching: createFetchingReducer(FETCH_PRODUCTS.request, FETCH_PRODUCTS.success)
});

export default products;

export const getAllProducts = ({allIds, byId, isFetching}) => ({
	items: allIds.map(id => byId[id]),
	isFetching
});

export const getProductById = ({byId, isFetching}, id) => ({
	item: byId[id],
	isFetching
});
