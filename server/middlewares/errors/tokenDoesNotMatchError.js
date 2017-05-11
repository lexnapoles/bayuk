import {sendJsonResponse} from "../../../utils/utils";
import {tokenDoesNotMatch} from "../../errors/api/authorizationErrors";

export default (err, req, res, next) => {
	if (err.name === "TokenDoesNotMatchError") {
		sendJsonResponse(res, 403, [tokenDoesNotMatch()]);
	}

	next(err);
};