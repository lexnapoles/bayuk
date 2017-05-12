import {has} from "lodash/object";
import {getUserById} from "../api/services/users";
import {sendJsonResponse} from "../../utils/utils";
import {userDoesNotExist} from "../errors/api/userErrors";
import dbErrors from "../errors/database";
import {unauthorizedAccess, tokenDoesNotMatch} from "../errors/api/authorizationErrors";

const invalidTokenInUserRoutes = req => has(req, "params") && has(req.params, "userId") && req.params.userId !== req.user.id;

export default (req, res, next) => {
	if (!has(req, "user") || !has(req.user, "id")) {
		sendJsonResponse(res, 401, [unauthorizedAccess()]);
		return;
	}

	if (invalidTokenInUserRoutes(req)) {
		sendJsonResponse(res, 403, [tokenDoesNotMatch()]);
		return;
	}

	getUserById(req.user.id)
		.then(() => next())
		.catch(error => {
			if (error.code === dbErrors.dataNotFound) {
				sendJsonResponse(res, 404, [userDoesNotExist()]);
				return;
			}

			sendJsonResponse(res, 500, [error]);
		});
};