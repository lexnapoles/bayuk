import db from "../../db";
import {addImages, writeImagesToDisk} from "./images";
import {mapArraysSequentially} from "../utils/utils";

const generateImagesObjs =  (imagesIds, product) => mapArraysSequentially(imagesIds, product.images)((id, data) => Object.assign({}, {id, data}));

const addProductToDB = product =>
	db.one("INSERT INTO products (name, description, category, price) " +
		"VALUES(${name}, ${description}, ${category}, ${price}) RETURNING uuid", product);

export const getProducts = () =>
	db.any("SELECT * FROM products")
		.then(products => products);

export const getProductById = productId =>
	db.one("SELECT * FROM products where uuid=$1", productId)
		.then(product => product)
		.catch(() => Promise.reject("Product could not be found"));

export const addProduct = product =>
	addProductToDB(product)
		.then(({uuid}) => addImages(product.images.length, uuid))
		.then(imagesIds => writeImagesToDisk(generateImagesObjs(imagesIds, product)))
		.then(uuid => Object.assign({}, product, {uuid}));

