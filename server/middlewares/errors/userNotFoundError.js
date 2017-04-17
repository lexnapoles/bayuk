import {sendJsonResponse} from "../../../utils/utils";
import {userDoesNotExist} from "../../errors/api/userErrors";

export default (err, req, res, next) => {
	if (err.name === "UserNotFoundError") {
		sendJsonResponse(res, 404, [userDoesNotExist()]);
	}

	next(err);
};