import {ADD_PRODUCT} from "../constants/actionTypes";
import product from "./product";

const products = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return [...state, product(void 0, action)];

		default:
			return state;
	}
};

export const getProductById = (state, id) => {
	return state.find(product => product.id === id);
};

export default products;


