const findType = (action, type) => type === action.type;

const isFetching = (REQUEST = [], RECEIVE = []) => (state = true, action) => {
	if (!Array.isArray(REQUEST) || !Array.isArray(RECEIVE)) {
		return state;
	}

	const requestType  = REQUEST.find(findType.bind(void 0, action)),
				receivedType = RECEIVE.find(findType.bind(void 0, action));


	if (requestType) {
		return true
	}
	else if (receivedType) {
		return false;
	}

	return state;
};

export default isFetching;