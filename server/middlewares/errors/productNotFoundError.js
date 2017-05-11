import {sendJsonResponse} from "../../../utils/utils";
import {productDoesNotExist} from "../../errors/api/productErrors";

export default (err, req, res, next) => {
	if (err.name === "ProductNotFoundError") {
		sendJsonResponse(res, 404, [productDoesNotExist()]);
	}

	next(err);
};
