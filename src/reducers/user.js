import {REGISTER_USER, LOGIN_USER} from "../constants/actionTypes";
import {getJwtPayload} from "../../utils/utils";

const user = (state = {name: "", token: ""}, action) => {
	switch (action.type) {
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

export default user;
