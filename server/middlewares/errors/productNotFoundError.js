import {sendJsonResponse} from "../../../utils/utils";
import {notFoundError} from "../../errors/api/productErrors";

export default (err, req, res, next) => {
	if (err.name === "ProductNotFoundError") {
		sendJsonResponse(res, 404, [notFoundError()]);
	}

	next(err);
};
