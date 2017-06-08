import db from "../../db";
import {products} from "../../sql/sql";
import {
	writeProductImagesToDisk,
	deleteProductImagesFromDisk,
	updateProductImages,
	getImagesOfProduct
} from "./productImages";
import {generateImagesObjs} from "../../utils";

export const getProducts = () => db.any(products.getAll);

export const getProductById = productId => db.one(products.getById, {productId});

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

			writeProductImagesToDisk(images);

			return createdProduct;
		});

const updateProductFromDB = product => db.one(products.update, product);

export const updateProduct = product =>
	updateProductImages(product.id, product.images)
		.then(() => updateProductFromDB(product));

const deleteProductFromDB = productId => db.proc("delete_product", productId);

export const deleteProduct = productId =>
	getImagesOfProduct(productId)
		.then(deleteProductImagesFromDisk)
		.then(deleteProductFromDB.bind(void 0, productId));

export const addProductWithAllFields = product => db.one(products.addWithAllFields, product);