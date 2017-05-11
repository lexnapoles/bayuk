import {has} from "lodash/object";
import {getProductById} from "../api/services/products";

const UserNotFoundError = () => ({
	name:    "UserNotFoundError",
	message: "User not found"
});

const ProductNotFoundError = () => ({
	name:    "ProductNotFoundError",
	message: "Product not found"
});

const TokenDoesNotMatchError = () => ({
	name:    "TokenDoesNotMatchError",
	message: "Token does not match userId"
});

export default (req, res, next) => {
	if (!has(req, "user")) {
		return next(UserNotFoundError());
	}

	if (!has(req, "params") || !has(req.params, "productId")) {
		return next(ProductNotFoundError());
	}

	const tokenUserId = req.user.id,
				productId   = req.params.productId;

	getProductById(productId)
		.then(({owner}) => owner !== tokenUserId ? next(TokenDoesNotMatchError()) : next())
		.catch(() => next(ProductNotFoundError()));
};