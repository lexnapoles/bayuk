import {has} from "lodash/object";
import {getProductById} from "../api/services/products";
import {sendJsonResponse} from "../../utils/utils";
import {userDoesNotExist} from "../errors/api/userErrors";
import {productDoesNotExist} from "../errors/api/productErrors";
import {tokenDoesNotMatch} from "../errors/api/authorizationErrors";

export default (req, res, next) => {
	if (!has(req, "user")) {
		sendJsonResponse(res, 404, [userDoesNotExist()]);
		return;
	}

	if (!has(req, "params") || !has(req.params, "productId")) {
		sendJsonResponse(res, 404, [productDoesNotExist()]);
		return;
	}

	const tokenUserId = req.user.id,
				productId   = req.params.productId;

	getProductById(productId)
		.then(({owner}) => owner !== tokenUserId ? sendJsonResponse(res, 403, [tokenDoesNotMatch()]) : next())
		.catch(() => sendJsonResponse(res, 404, [productDoesNotExist()]));
};