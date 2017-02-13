import {sendJsonResponse} from "../../../utils/utils";
import {getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../services/products";
import {has} from "lodash/object";

export const readProducts = (req, res) =>
	getProducts()
		.then(products => sendJsonResponse(res, 200, products))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));

export const readOneProduct = (req, res) => {
	if (!has(req, "params") && !has(req.params, "productId")) {
		sendJsonResponse(res, 404, {
			"message": "No productId in request"
		});
		return;
	}

	const {productId} = req.params;

	getProductById(productId)
		.then(product => sendJsonResponse(res, 200, product))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));
};

export const createProduct = (req, res) => {
	if (!has(req, "body")) {
		sendJsonResponse(res, 404, "No product data");
		return;
	}

	const product = {
		...req.body,
		owner: req.user.id
	};

	addProduct(product)
		.then(msg => sendJsonResponse(res, 201, msg))
		.catch(error => sendJsonResponse(res, 404, error));
};

export const updateOneProduct = (req, res) => {
	if (!has(req, "params") && !has(req.params, "productId")) {
		sendJsonResponse(res, 404, {
			"message": "No productId in request"
		});
		return;
	}
	else if (!has(req, "body")) {
		sendJsonResponse(res, 404, "No product data");
		return;
	}

	const {productId} = req.params,
				product     = req.body;

	return updateProduct(productId, product)
		.then(product => sendJsonResponse(res, 200, product))
		.catch(() => sendJsonResponse(res, 404, {
			"message": "Product could not be updated"
		}));
};

export const deleteOneProduct = (req, res) => {
	if (!has(req, "params") && !has(req.params, "productId")) {
		sendJsonResponse(res, 404, {
			"message": "No productId in request"
		});
		return;
	}

	const {productId} = req.params;

	return deleteProduct(productId)
		.then(() => sendJsonResponse(res, 204, null))
		.catch(error => sendJsonResponse(res, 404, error));
};