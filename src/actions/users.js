import {fetchOneUser} from "./api";

export const loadUser = userId =>  (dispatch, getState) => {
	const user = getState().entities.users.byId[userId];

	if (user) {
		return null;
	}

	return dispatch(fetchOneUser(userId));
};
