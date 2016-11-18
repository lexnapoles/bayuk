import {v4} from "node-uuid";
import {ADD_PRODUCT} from "../constants/actionTypes";

const productsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT: {
			const product = Object.assign({}, {id: v4()}, action.payload.product);

			return [...state, product];

		}
		default:
			return state;
	}
};

export const getProductById = (state, id) => {
	return state.find(product => product.id === id);
};

export default productsReducer;


