import { REHYDRATE } from "redux-persist/constants";
import {
  REGISTER_USER,
  LOGIN_USER,
  FETCH_CURRENT_USER
} from "../constants/actionTypes";
import { getJwtPayload, isNotEmpty } from "../utils";

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
      const token = action.payload;
      const { id } = getJwtPayload(token);

      return {
        ...state,
        id,
        token
      };
    }

    case FETCH_CURRENT_USER.failure:
      return {};

    default:
      return state;
  }
};

export const getCurrentUser = user => ({ ...user });

export const isUserLoggedIn = user =>
  isNotEmpty(user) ? Boolean(user.token) : false;

export default currentUser;
