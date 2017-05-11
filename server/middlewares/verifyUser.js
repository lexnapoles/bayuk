import {has} from "lodash/object";
import {getUserById} from "../api/services/users";

const UserNotFoundError = () => ({
	name:    "UserNotFoundError",
	message: "User not found"
});

const TokenDoesNotMatchError = () => ({
	name:    "TokenDoesNotMatchError",
	message: "Token does not match userId"
});

export default (req, res, next) => {
	if (!has(req, "user")) {
		return next(UserNotFoundError());
	}

	const tokenUserId = req.user.id;

	if (has(req, "params") && has(req.params, "userId") && req.params.userId !== tokenUserId) {
		return next(TokenDoesNotMatchError());
	}

	getUserById(tokenUserId)
		.then(() => next())
		.catch(() => next(UserNotFoundError()));
};