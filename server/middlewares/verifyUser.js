import {has} from "lodash/object";
import {getUser} from "../api/services/user";

const UserNotFoundError = () => ({
	name: "UserNotFoundError",
	message: "User not found"
});

export default (req, res, next) => {
	if (!has(req, "user")) {
		return next(UserNotFoundError());
	}

	getUser(req.user)
		.then(() => next())
		.catch(() => next(UserNotFoundError()));
};