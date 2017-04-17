import db, {queryResult} from "../../db";
import {products} from "../../sql/sql";
import {
	writeImagesToDisk,
	deleteImagesFromDisk,
	updateImages,
	getImagesOfProduct
} from "./images";
import {generateImagesObjs} from "../../../utils/utils";

export const getProducts = () => db.any(products.getAll);

export const getProductById = productId =>
	db.one(products.getById, {productId})
		.catch(() => Promise.reject("Product could not be found"));

const addProductToDB = product =>
	db.one(products.add, {
		...product,
		images_count: product.images.length
	});

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

export const addProductWithAllFields = product => db.one(products.addWithAllFields, product);
