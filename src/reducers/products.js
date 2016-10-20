import {ADD_PRODUCT} from "../constants/actionTypes";

const productsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return [...state.products, action.payload.product];

		default:
			return state;
	}
}

export const getProductById = (state, id) => {
	return state.find(product => product.id === id);
}

export default productsReducer;


