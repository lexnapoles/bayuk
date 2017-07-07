import {combineReducers} from "redux";
import {FETCH_ONE_USER, FETCH_USERS} from "../constants/actionTypes";
import createFetchingReducer from "./isFetching";
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

		default:
			return state;
	}
};

export default combineReducers({
	byId,
	allIds,
	isFetching: createFetchingReducer([FETCH_USERS, FETCH_ONE_USER])
});