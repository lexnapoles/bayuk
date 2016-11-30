import db from "../../db";
import addImages from "./images";

const addProductToDB = product =>
	db.one("INSERT INTO products (name, description, category, price) " +
		"VALUES(${name}, ${description}, ${category}, ${price}) RETURNING uuid", product);

export const getProducts = () =>
	db.any("SELECT * FROM products")
		.then(products => products)
		.catch(Promise.reject);

export const getProductById = productId =>
	db.one("SELECT * FROM products where uuid=$1", productId)
		.then(product => product)
		.catch(() => Promise.reject("Product could not be found"));

export const addProduct = product =>
	addProductToDB(product)
		.then(({uuid}) => addImages(product.images, uuid))
		.then(uuid => Object.assign({}, product, {uuid}))
		.catch(Promise.reject);


