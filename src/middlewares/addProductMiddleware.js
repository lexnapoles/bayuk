import {ADD_PRODUCT} from "../constants/actionTypes";
import {browserHistory} from 'react-router'

const addProductMiddleware = () => next => action => {
	switch (action.type) {
		case ADD_PRODUCT.success: {
			next(action);

			browserHistory.push(`/product/${action.payload.id}`);

			break;
		}

		default:
			next(action);
	}
};

export default addProductMiddleware;