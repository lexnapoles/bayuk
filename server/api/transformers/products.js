import {getImagePath} from "../../utils";
import {extractFields, getSelectedFields, getBaseUrl} from "./transformer";


const transform = (req, product) => {
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

	return getSelectedFields(transform(req, product), fields);
};
