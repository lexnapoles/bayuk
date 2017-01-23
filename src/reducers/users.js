import {combineReducers} from "redux";
import {FETCH_USERS} from "../constants/actionTypes";
import createFetchingReducer from "./isFetching";

const byId = (state = {}, action) => {
	switch (action.type) {
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
		case FETCH_USERS.success:
			return [...state, ...action.payload.result];

		default:
			return state;
	}
};

const users = combineReducers({
	byId,
	allIds,
	isFetching: createFetchingReducer(FETCH_USERS.request, FETCH_USERS.success)
});

export default users;

export const getAllUsers = ({allIds, byId, isFetching}) => ({
	items: allIds.map(id => byId[id]),
	isFetching
});

export const getUserById = ({byId, isFetching}, id) => ({
	item: byId[id],
	isFetching
});
