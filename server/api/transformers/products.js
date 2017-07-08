import {getImagePath} from "../../utils";

export const transformProduct = product => ({
	id:          product.id,
	name:        product.name,
	images:      product.images.map(getImagePath.bind(void 0, "product")),
	owner:       product.owner,
	description: product.description,
	category:    product.category,
	createdAt:   product.created_at,
	price:       parseInt(product.price, 10),
	latitude:    parseFloat(product.latitude),
	longitude:   parseFloat(product.longitude),
	sold:        product.sold
});