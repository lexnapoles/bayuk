import pool from "../../db";

const isValidResponse     = response => response.rowCount,
			getDataFromResponse = response => response.rows;

export const getProductById = productId =>
	pool.query("SELECT * FROM products WHERE uuid = $1::uuid", [productId])
			.then(products => isValidResponse(products)
				? getDataFromResponse(products)[0]
				: Promise.reject("Product id not found"));
