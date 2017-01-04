import {paramExists, bodyExists, sendJsonResponse} from "../../utils/utils";
import {getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../services/products";
import {getUser} from "../services/user";

export const readProducts = (req, res) =>
	getProducts()
		.then(products => sendJsonResponse(res, 200, products))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));

export const readOneProduct = (req, res) => {
	if (!paramExists(req, "productId")) {
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
	if (!bodyExists(req)) {
		sendJsonResponse(res, 404, "No product data");
	}

	addProduct(req.body)
		.then(msg => sendJsonResponse(res, 201, msg))
		.catch(error => sendJsonResponse(res, 404, error));
};

export const updateOneProduct = (req, res) => {
	if (!paramExists(req, "productId")) {
		sendJsonResponse(res, 404, {
			"message": "No productId in request"
		});
	}
	else if (!bodyExists(req)) {
		sendJsonResponse(res, 404, "No product data");
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
	if (!paramExists(req, "productId")) {
		sendJsonResponse(res, 404, {
			"message": "No productId in request"
		});
	}

	const {productId} = req.params;

	return deleteProduct(productId)
		.then(() => sendJsonResponse(res, 204, null))
		.catch(error => sendJsonResponse(res, 404, error));
};