import {has} from "lodash/object";
import {getProductById} from "../api/services/products";
import {sendJsonResponse} from "../../utils/utils";
import {userDoesNotExist} from "../errors/api/userErrors";
import {tokenDoesNotMatch} from "../errors/api/authorizationErrors";

const ProductNotFoundError = () => ({
	name:    "ProductNotFoundError",
	message: "Product not found"
});


export default (req, res, next) => {
	if (!has(req, "user")) {
		sendJsonResponse(res, 404, [userDoesNotExist()]);
		return;
	}


	if (!has(req, "params") || !has(req.params, "productId")) {
		return next(ProductNotFoundError());
	}

	const tokenUserId = req.user.id,
				productId   = req.params.productId;

	getProductById(productId)
		.then(({owner}) => owner !== tokenUserId ? 	sendJsonResponse(res, 403, [tokenDoesNotMatch()]) : next())
		.catch(() => next(ProductNotFoundError()));
};