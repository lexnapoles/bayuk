import {fetchOneUser} from "./api";
import {getUserById} from "../reducers/root";

export const loadUser = userId => (dispatch, getState) => {
	const user = getUserById(getState(), userId);

	if (user) {
		return null;
	}

	return dispatch(fetchOneUser(userId));
};