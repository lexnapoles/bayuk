const createFetchingReducer = (REQUEST, RECEIVE) => (state = false, action) => {
	switch (action.type) {
		case REQUEST:
			return true;

		case RECEIVE:
			return false;

		default:
			return state;
	}
};

export default createFetchingReducer;