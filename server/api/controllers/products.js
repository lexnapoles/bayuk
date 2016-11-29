import {sendJsonResponse} from "../utils/utils";
import {getProducts, getProductById, addProduct} from "../services/products";

const paramExists = (req, param) => req.params && req.params[param];

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
	if (!req || !req.body) {
		sendJsonResponse(res, 404, "No product data")
	}

	addProduct(req.body)
		.then(msg => sendJsonResponse(res, 201, msg))
		.catch(error => sendJsonResponse(res, 404, error));
};

export const updateOneProduct = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});

};

export const deleteOneProduct = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});
};
