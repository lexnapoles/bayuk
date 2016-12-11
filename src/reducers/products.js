import {normalize} from "normalizr";
import {combineReducers} from "redux";
import {SET_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import * as schema from "../actions/schema";
import product from "./product";

const byId = (state = {}, action) => {
	switch (action.type) {
		case ADD_PRODUCT: {
			const id = action.payload.product.id;

			return {
				...state,
				[id]: product(void 0, product)
			};
		}

		case SET_PRODUCTS: {
			const normalizedProducts = normalize(action.payload, schema.arrayOfProducts);

			return {
				...state,
				...normalizedProducts.entities.products
			}
		}

		default:
			return state;
	}
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT: {
			const {product} =  action.payload;

			return [...state, product.id];
		}

		case SET_PRODUCTS: {
			const normalizedProducts = normalize(action.payload, schema.arrayOfProducts);

			return [...state, ...normalizedProducts.result];
		}

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
