import {FETCH_ONE_USER} from "../constants/actionTypes";

const user = (state, action) => {
	switch (action.type) {
		case FETCH_ONE_USER.success:
			return {...action.payload};

		default:
			return state;
	}
};

export default user;
