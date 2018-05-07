import { browserHistory } from "react-router";
import { REGISTER_USER, LOGIN_USER } from "../constants/actionTypes";

const authMiddleware = () => next => action => {
  switch (action.type) {
    case REGISTER_USER.success:
    case LOGIN_USER.success: {
      next(action);
      browserHistory.goBack();
      break;
    }
    default:
      next(action);
  }
};

export default authMiddleware;
