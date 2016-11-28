import pool from "../../db";

const isValidResponse     = response => response.rowCount,
			getDataFromResponse = response => response.rows;

export const getProducts = () =>
	pool.query("SELECT * FROM products")
			.then(products => isValidResponse(products)
				? getDataFromResponse(products)
				: Promise.reject("Products not found"))
			.catch(error => Promise.reject(error));

export const getProductById = productId =>
	pool.query("SELECT * FROM products WHERE uuid = $1::uuid", [productId])
			.then(products => isValidResponse(products)
				? getDataFromResponse(products)[0]
				: Promise.reject("Product id not found"))
			.catch(error => Promise.reject(error));

// export const addProduct = product => {
// 	pool.query("INSERT INTO products (uuid, name, description, category, price) VALUES")
// }