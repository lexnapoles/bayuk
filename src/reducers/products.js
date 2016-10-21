import {v4} from "node-uuid";
import {ADD_PRODUCT} from "../constants/actionTypes";

const getCategory = categories => {
	const keys = Object.keys(categories);

	return keys.find(key => categories[key]);
};

const productsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_PRODUCT: {
			const {name, description, categories, price, images} = action.payload.product;

			const product = {
				id: v4(),
				images,
				name,
				description,
				category: getCategory(categories),
				price
			};

			return [...state, product];

		}
		default:
			return state;
	}
}

export const getProductById = (state, id) => {
	return state.find(product => product.id === id);
}

export default productsReducer;


