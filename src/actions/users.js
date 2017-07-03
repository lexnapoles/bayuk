import {fetchOneUser} from "./api";
import {UPDATE_GEOLOCATION} from "../constants/actionTypes";
import {getGeolocation} from "../reducers/root";

export const loadUser = userId => (dispatch, getState) => {
	const user = getState().entities.users.byId[userId];

	if (user) {
		return null;
	}

	return dispatch(fetchOneUser(userId));
};

export const updateGeolocation = coords => ({
	type:    UPDATE_GEOLOCATION,
	payload: coords
});

export const loadGeolocation = coords => (dispatch, getState) => {
	const userGeo = getGeolocation(getState());

	if (userGeo) {
		return null;
	}

	return dispatch(updateGeolocation(coords));
};

