import db from "../../db";

export const getProducts = () =>
	db.any("SELECT * FROM products")
		.then(products => products)
		.catch(error => Promise.reject(error));

export const getProductById = productId =>
	db.one("SELECT * FROM products where uuid=$1", productId)
		.then(product => product)
		.catch(() => Promise.reject("Product could not be found"));

export const addProduct = product =>
	db.none("INSERT INTO products (uuid, name, description, category, price) " +
		"values(${uuid}, ${name}, ${description},${category}, ${price})", product)
		.then(() => product)
		.catch(() => Promise.reject("Product could not be created"));
