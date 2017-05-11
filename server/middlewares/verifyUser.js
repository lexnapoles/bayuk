import {has} from "lodash/object";
import {getUserById} from "../api/services/users";
import {sendJsonResponse} from "../../utils/utils";
import {userDoesNotExist} from "../errors/api/userErrors";
import {tokenDoesNotMatch} from "../errors/api/authorizationErrors";

export default (req, res, next) => {
	if (!has(req, "user")) {
		sendJsonResponse(res, 404, [userDoesNotExist()]);
		return;
	}

	const tokenUserId = req.user.id;

	if (has(req, "params") && has(req.params, "userId") && req.params.userId !== tokenUserId) {
		sendJsonResponse(res, 403, [tokenDoesNotMatch()]);
		return;
	}

	getUserById(tokenUserId)
		.then(() => next())
		.catch(() => sendJsonResponse(res, 404, [userDoesNotExist()]));
};