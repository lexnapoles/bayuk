import {REGISTER_USER, LOGIN_USER} from "../constants/actionTypes";
import {getJwtPayload} from "../../utils/utils";
import {REHYDRATE} from 'redux-persist/constants'

const currentUser = (state = {id: "", token: "", rehydrated: false}, action) => {
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
						{id}    = getJwtPayload(token);

			return {
				...state,
				id,
				token
			};
		}
		default:
			return state;
	}
};

export const getCurrentUser = (user) => ({...user});

export const isLoggedIn = ({token, rehydrated}) => {
	return rehydrated
		? Boolean(token.length)
		: false;
};

export default currentUser;
