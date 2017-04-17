import {sendJsonResponse} from "../../../utils/utils";
import {unauthorizedAccess} from "../../errors/api/authorizationErrors";

export default (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		sendJsonResponse(res, 401, [unauthorizedAccess()]);
	}

	next(err);
};