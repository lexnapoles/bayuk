import {getErrorMessage} from "../../utils/utils";

const errorMessage = (state = null, action) => {
	const {error} = action;

	if (error) {
		return getErrorMessage(action.payload);
	}

	return state;
};

export default errorMessage;