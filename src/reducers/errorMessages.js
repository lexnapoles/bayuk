const errorMessage = (state = null, action) => {
	const {error} = action;

	if (error) {
		return action.payload.response;
	}

	return state;
};

export default errorMessage;