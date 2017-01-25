import {REGISTER_USER, LOGIN_USER} from "../constants/actionTypes";
import {getJwtPayload} from "../../utils/utils";
import {REHYDRATE} from 'redux-persist/constants'
import {omit} from "lodash/object";

const currentUser = (state = {rehydrated: false}, action) => {
	switch (action.type) {
		case REHYDRATE:
			return {
				...state,
				...action.payload.currentUser,
				rehydrated: true
			};

		case REGISTER_USER.success:
		case LOGIN_USER.success: {
			const {token} = action.payload,
						payload = omit(getJwtPayload(token), ["exp", "iat"]);

			return {
				...state,
				...payload,
				token
			};
		}
		default:
			return state;
	}
};

export const getCurrentUser = user => ({...user});

export const isUserLoggedIn = ({token, rehydrated}) => {
	return rehydrated
		? Boolean(token)
		: false;
};

export default currentUser;
