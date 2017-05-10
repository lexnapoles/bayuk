import {has} from "lodash/object";
import {getUserById} from "../api/services/users";

const UserNotFoundError = () => ({
	name: "UserNotFoundError",
	message: "User not found"
});

export default (req, res, next) => {
	if (!has(req, "user")) {
		return next(UserNotFoundError());
	}

	getUserById(req.user.id)
		.then(() => next())
		.catch(() => next(UserNotFoundError()));
};