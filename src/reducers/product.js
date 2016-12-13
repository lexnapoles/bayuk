import {ADD_PRODUCT} from "../constants/actionTypes";

const product = (state, action) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return {...action.payload};

		default:
			return state;
	}
};

export default product;
