import {sendJsonResponse} from "../../utils/utils";

export default (err, req, res, next) => {
	if (err.name === "UserNotFoundError") {
		sendJsonResponse(res, 404, {
			"message": `${err.name}: ${err.message}`
		});
	}

	next(err);
};