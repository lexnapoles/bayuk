import {pick} from "lodash/object";
import {intersection} from "lodash/array";
import {sendJsonResponse} from "../../../utils";
import {getProducts, getProductById, addProduct, updateProduct, deleteProduct} from "../../services/products";
import {transformProduct} from "../../transformers/products";
import {productDoesNotExist}  from "../../../errors/api/productErrors";
import dbErrors  from "../../../errors/database";
import {validateRequest, validateId} from "../validators";
import {validateProduct} from "./validators"

const generateLinkHeaders = (products, filters) => {
	const {id: lastId} = products[products.length - 1];

	const nextFilter = {
		...filters,
		lastId
	};

	const link = encodeURI(Buffer.from(JSON.stringify(nextFilter)).toString('base64'));

	return `</api/products?cursor=${link}>; rel="next"`;
};

const getSortingFilters = queryParameters => {
	const SORT_BY_DISTANCE = "distance",
				SORT_ORDER       = "descending";

	const errors = validateRequest(queryParameters, ["sort", "order", "latitude", "longitude"]);

	if (errors.length) {
		return {
			errors
		}
	}

	const {sort, order, radius, latitude, longitude, ...optionalQueryParams} = queryParameters;

	const filters = {
		sortByDistance: sort === SORT_BY_DISTANCE,
		descending:     order === SORT_ORDER,
		radius,
		latitude,
		longitude,
		...optionalQueryParams
	};

	return {
		filters,
		errors: []
	}
};

const getOwnerFilters = queryParameters => {
	const {owner, sold, lastId} = queryParameters;

	const filters = {owner, sold, lastId};

	return {
		filters,
		errors: []
	};
};

const getFilters = req => {
	const query = req.query.cursor
		? JSON.parse(Buffer.from(decodeURI(req.query.cursor), 'base64').toString())
		: req.query;

	if (query.owner) {
		return getOwnerFilters(query);
	}

	return getSortingFilters(query);
};

const getSelectedFields = (product, fields) => {
	if (fields) {
		const fieldsInProduct = intersection(Object.keys(product), fields);

		return fieldsInProduct.length ? pick(product, fieldsInProduct) : product;
	}

	return product;
};

export const readProducts = (req, res) => {
	const {filters, errors} = getFilters(req);

	if (errors.length) {
		sendJsonResponse(res, 400, errors);
		return;
	}

	const fields = req.query.fields ? req.query.fields.split(",") : void 0;

	getProducts(filters)
		.then(products => products.map(transformProduct))
		.then(products => products.map(product => getSelectedFields(product, fields)))
		.then(products => {
			if (products.length) {
				res.set("Link", generateLinkHeaders(products, req.query));
			}

			sendJsonResponse(res, 200, products);
		})
		.catch(error => sendJsonResponse(res, 500, [error]));
};

export const readOneProduct = (req, res) => {
	const requestErrors = [
		...validateRequest(req, "params"),
		...validateRequest(req.params, "productId")
	];

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const {productId} = req.params;

	const invalidIdError = validateId(productId);

	if (invalidIdError.length) {
		sendJsonResponse(res, 400, invalidIdError);
		return;
	}

	const fields = req.query.fields ? req.query.fields.split(",") : void 0;

	getProductById(productId)
		.then(transformProduct)
		.then(product => getSelectedFields(product, fields))
		.then(product => sendJsonResponse(res, 200, product))
		.catch(error => {
			if (error.code === dbErrors.dataNotFound) {
				sendJsonResponse(res, 404, [productDoesNotExist()]);
				return;
			}

			sendJsonResponse(res, 500, [error]);
		});
};

export const createProduct = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const invalidProductErrors = validateProduct(req.body);

	if (invalidProductErrors.length) {
		sendJsonResponse(res, 400, invalidProductErrors);
		return;
	}

	const product = {
		...req.body,
		owner: req.user.id
	};

	addProduct(product)
		.then(transformProduct)
		.then(product => {
			res.location(`/api/products/${product.id}`);
			sendJsonResponse(res, 201, product)
		})
		.catch(error => sendJsonResponse(res, 500, [error]));
};

export const updateOneProduct = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const {productId} = req.params,
				product     = req.body;

	const invalidProductErrors = validateProduct(product);

	if (invalidProductErrors.length) {
		sendJsonResponse(res, 400, invalidProductErrors);
		return;
	}

	return getProductById(productId)
		.then(() => updateProduct(product))
		.then(transformProduct)
		.then(product => sendJsonResponse(res, 200, product))
		.catch(error => sendJsonResponse(res, 500, [error]));
};

export const deleteOneProduct = (req, res) => {
	const {productId} = req.params;

	return getProductById(productId)
		.then(() => deleteProduct(productId))
		.then(() => sendJsonResponse(res, 204, null))
		.catch(error => sendJsonResponse(res, 500, [error]));
};