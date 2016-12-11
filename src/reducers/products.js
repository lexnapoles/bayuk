import {SET_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";

const products = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return [...state, product(void 0, action)];

		case SET_PRODUCTS:
			return action.payload.products;

		default:
			return state;
	}
};

export const getProductById = (state, id) => {
	return state.find(product => product.uuid === id);
};

export default products;


