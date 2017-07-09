import {fetchCurrentUser} from "./api";
import {getUserById, getCurrentUser} from "../reducers/root";
import {isNotEmpty} from "../utils";

export const loadCurrentUser = () => (dispatch, getState) => {
	const loggedUser = getCurrentUser(getState());

	if (isNotEmpty(loggedUser)) {
		const {id} = loggedUser,
					user = getUserById(getState(), id);

		if (user) {
			return null;
		}

		return dispatch(fetchCurrentUser(id));
	}

	return null;
};