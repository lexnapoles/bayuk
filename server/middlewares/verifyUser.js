import {has} from "lodash/object";
import {getUserByEmail} from "../api/services/users";

const UserNotFoundError = () => ({
	name: "UserNotFoundError",
	message: "User not found"
});

export default (req, res, next) => {
	if (!has(req, "user")) {
		return next(UserNotFoundError());
	}

	getUserByEmail(req.user.email)
		.then(() => next())
		.catch(() => next(UserNotFoundError()));
};