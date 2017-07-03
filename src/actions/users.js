import {fetchOneUser} from "./api";
import {UPDATE_GEOLOCATION} from "../constants/actionTypes";
import {getUserById, getGeolocation} from "../reducers/root";

export const updateGeolocation = coords => ({
	type:    UPDATE_GEOLOCATION,
	payload: coords
});

export const loadUser = userId => (dispatch, getState) => {
	const user = getUserById(getState(), userId).item;

	if (user) {
		return null;
	}

	return dispatch(fetchOneUser(userId));
};


export const loadGeolocation = coords => (dispatch, getState) => {
	const userGeo = getGeolocation(getState());

	if (userGeo) {
		return null;
	}

	return dispatch(updateGeolocation(coords));
};

