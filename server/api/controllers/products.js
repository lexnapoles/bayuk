import {sendJsonResponse} from "../utils/utils";
import {getProductById} from "../services/products";

export const readProducts = (req, res) => {
	sendJsonResponse(res, 200, {"status": "success"});
};

export const readOneProduct = (req, res) => {
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
