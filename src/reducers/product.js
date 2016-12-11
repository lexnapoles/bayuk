import {v4} from "node-uuid";
import {ADD_PRODUCT} from "../constants/actionTypes";

const product = (state, action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return {
				id: v4(),
				...action.payload.product
			};

		default:
			return state;
	}
};

export default product;
