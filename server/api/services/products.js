import db, {queryResult} from "../../db";
import {
	writeImagesToDisk,
	deleteImagesFromDisk,
	updateImages,
	getImagesOfProduct
} from "./images";
import {generateImagesObjs} from "../utils/utils";

export const getProducts = () => db.any("SELECT * FROM products_with_images");

export const getProductById = productId =>
	db.one("SELECT * FROM products_with_images WHERE id=$1", productId)
		.catch(() => Promise.reject("Product could not be found"));

const addProductToDB = ({name, description, category, price, images}) =>
	db.func("add_product", [
		name,
		description,
		category,
		price,
		images.length
	], queryResult.one);

export const addProduct = product =>
	addProductToDB(product)
		.then(createdProduct => {
			const imagesIds  = createdProduct.images,
						imagesData = product.images,
						images     = generateImagesObjs(imagesIds, imagesData);

			writeImagesToDisk(images);

			return createdProduct;
		});

const updateProductFromDB = (productId, {name, description, category, price}) =>
	db.func("update_product", [
		productId,
		name,
		description,
		category,
		price
	], queryResult.one);

export const updateProduct = (productId, product) =>
	updateImages(productId, product.images)
		.then(updateProductFromDB.bind(void 0, productId, product));

const deleteProductFromDB = productId => db.proc("delete_product", productId);

export const deleteProduct = productId =>
	getImagesOfProduct(productId)
		.then(deleteImagesFromDisk)
		.then(deleteProductFromDB.bind(void 0, productId));