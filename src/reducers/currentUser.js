import {REGISTER_USER, LOGIN_USER, UPDATE_GEOLOCATION} from "../constants/actionTypes";
import {getJwtPayload, isNotEmpty} from "../utils";
import {REHYDRATE} from 'redux-persist/constants'
import {omit} from "lodash/object";

const currentUser = (state = {}, action) => {
	switch (action.type) {
		case REHYDRATE: {
				return {
				...state,
				...action.payload.currentUser
			};
		}

		case REGISTER_USER.success:
		case LOGIN_USER.success: {
			const token = action.payload,
						payload = omit(getJwtPayload(token), ["exp", "iat"]);

			return {
				...state,
				...payload,
				token
			};
		}

		case UPDATE_GEOLOCATION: {
			const {latitude, longitude} = action.payload.coords;

			return {
				...state,
				latitude,
				longitude
			};
		}
		default:
			return state;
	}
};

export const getGeolocation = (user) => user.latitude && user.longitude ? {latitude: user.latitude, longitude: user.longitude} : null;

export const getCurrentUser = user => ({...user});

export const isUserLoggedIn = user => isNotEmpty(user) ? Boolean(user.token) : false;

export default currentUser;
