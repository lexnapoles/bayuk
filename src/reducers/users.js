import {combineReducers} from "redux";
import {omit} from "lodash/object";
import {getJwtPayload} from "../utils";
import {FETCH_ONE_USER, FETCH_USERS, REGISTER_USER, LOGIN_USER} from "../constants/actionTypes";
import user from "./user";

const byId = (state = {}, action) => {
	switch (action.type) {
		case FETCH_ONE_USER.success:
			return {
				...state,
				[action.payload.id]: user(void 0, action)
			};

		case FETCH_USERS.success:
			return {
				...state,
				...action.payload.entities.users
			};

		case REGISTER_USER.success:
		case LOGIN_USER.success: {
			const token = action.payload,
						user  = omit(getJwtPayload(token), ["exp", "iat"]);

			return {
				...state,
				[user.id]: user
			};
		}


		default: {
			return state;
		}
	}
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case FETCH_ONE_USER.success:
			return [...state, action.payload.id];

		case FETCH_USERS.success:
			return [...state, ...action.payload.result];

		case REGISTER_USER.success:
		case LOGIN_USER.success: {
			const token = action.payload,
						{id}  = getJwtPayload(token);

			return [...state, id];
		}


		default:
			return state;
	}
};

export default combineReducers({
	byId,
	allIds
});