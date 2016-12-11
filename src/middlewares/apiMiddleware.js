import {API} from "../constants/actionTypes";

const apiMiddleware = ({dispatch}) => next => action => {
	if (action.type !== API) {
		return next(action);
	}

	const {url, success} = action.payload,
				BASE_URL  = "/api";

	fetch(`${BASE_URL}${url}`)
		.then(response => response.json())
		.then(response => dispatch({
			type: success,
			payload: response
		}));
};

export default apiMiddleware;