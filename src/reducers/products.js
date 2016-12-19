import {combineReducers} from "redux";
import {FETCH_PRODUCTS, SET_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";
import createFetchingReducer from "./isFetching";

const byId = (state = {}, action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return {
				...state,
				[action.payload.id]: product(void 0, action)
			};

		case SET_PRODUCTS:
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
		case ADD_PRODUCT:
			return [...state, action.payload.id];

		case SET_PRODUCTS:
			return [...state, ...action.payload.result];

		default:
			return state;
	}
};

const products = combineReducers({
	byId,
	allIds,
	isFetching: createFetchingReducer(FETCH_PRODUCTS, SET_PRODUCTS)
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
