import {UPDATE_GEOLOCATION} from "../constants/actionTypes";

const location = (state = {}, action) => {
	switch (action.type) {
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

export const getGeolocation = ({latitude, longitude}) => latitude && longitude ? {latitude, longitude} : null;

export default location;