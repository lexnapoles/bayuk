const isAsyncActionType = (action, {request, success}) => action[request] && action[success];

const findType = (action, key, type) => type[key] === action.type;

const isFetching = (actions, keys = {request: "request", success: "success"}) => (state = true, action) => {
	if (!Array.isArray(actions)) {
		actions = [actions];
	}

	for (const action of actions) {
		if (!isAsyncActionType(action, keys)) {
			throw "isFetching error: actions are not async action types";
		}
	}

	const request = actions.find(findType.bind(void 0, action, keys.request)),
				success = actions.find(findType.bind(void 0, action, keys.success));

	if (request) {
		return true
	}
	else if (success) {
		return false;
	}

	return state;
};

export default isFetching;