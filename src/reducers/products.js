import {SET_PRODUCTS, ADD_PRODUCT} from "../constants/actionTypes";

const productsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT: {
			const product = Object.assign({}, action.payload.product);

			return [...state, product];
		}

		case SET_PRODUCTS:
			return action.payload.products;

		default:
			return state;
	}
};

export const getProductById = (state, id) => {
	return state.find(product => product.uuid === id);
};

export default productsReducer;


