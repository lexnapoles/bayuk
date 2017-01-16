import {REGISTER_USER, LOGIN_USER} from "../constants/actionTypes";
import {getJwtPayload} from "../../utils/utils";
import {REHYDRATE} from 'redux-persist/constants'

const user = (state = {name: "", token: "", rehydrated: false}, action) => {
	switch (action.type) {
		case REHYDRATE:
			return {
				...state,
				...action.payload.user,
				rehydrated: true
			};

		case REGISTER_USER.success:
		case LOGIN_USER.success: {
			const {token} = action.payload,
						{name}  = getJwtPayload(token);

			return {
				...state,
				name,
				token
			};
		}
		default:
			return state;
	}
};

export const getCurrentUser = (user) => ({...user});

export const isLoggedIn = ({token, rehydrated}) => {
	return rehydrated ? Boolean(token.length) : false;
};

export default user;
