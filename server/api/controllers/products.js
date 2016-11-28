import {sendJsonResponse} from "../utils/utils";
import {getProductById} from "../services/products";

const paramExists = (req, param) => req.params && req.params[param];

export const readProducts = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});
};

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

export const createProducts = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});

};

export const updateOneProduct = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});

};

export const deleteOneProduct = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});

};
