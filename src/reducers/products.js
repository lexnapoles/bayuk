import {combineReducers} from "redux";
import {SET_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";

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
	allIds
});

export default products;

export const getAllProducts = state => state.allIds.map(id => state.byId[id]);

export const getProductById = (state, id) => state.byId[id];
