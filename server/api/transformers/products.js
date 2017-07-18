import {getImagePath} from "../../utils";
import {pick} from "lodash/object";
import {intersection} from "lodash/array";

const extractFields = req => req.query.fields ? req.query.fields.split(",") : void 0;

export const getSelectedFields = (object, fields) => {
	if (fields) {
		const fieldsInObject = intersection(Object.keys(object), fields);

		return fieldsInObject.length ? pick(object, fieldsInObject) : object;
	}

	return object;
};

const getBaseUrl = req => `${req.protocol}://${req.headers.host}`;

const transform = (product, req) => {
	const baseUrl = getBaseUrl(req);

	return ({
		id:          product.id,
		name:        product.name,
		images:      product.images.map(id => `${baseUrl}${getImagePath("product", id)}`),
		owner:       product.owner,
		description: product.description,
		category:    product.category,
		createdAt:   product.created_at,
		price:       parseInt(product.price, 10),
		latitude:    parseFloat(product.latitude),
		longitude:   parseFloat(product.longitude),
		sold:        product.sold
	});
};

export const transformProduct = (req, product) => {
	const fields = extractFields(req);

	return getSelectedFields(transform(product, req), fields);
};
