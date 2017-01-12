import {sendJsonResponse} from "../../../utils/utils";

export default (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		sendJsonResponse(res, 401, {
			"message": `${err.name}: ${err.message}`
		});
	}

	next(err);
};