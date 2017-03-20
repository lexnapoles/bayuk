import fs from "fs-promise";
import path from "path";
import db from "../../db";

const getProductImagesIds = () =>
	db.any("SELECT image_id from product_images")
		.then(result => result.map(({image_id}) => image_id));

const getImagePath = name => path.join(process.env.IMAGESDIR, "products", `${name}`);

const PLACEHOLDER_IMAGE = getImagePath("placeholder.jpg");

const deleteFile = path =>
	path !== PLACEHOLDER_IMAGE
		? fs.unlink(path)
		: Promise.resolve(true);

const cleanAllPreviouslyCreatedImages = () =>
	fs.readdir(path.join(process.env.IMAGESDIR, "products"))
		.then(files => files.map(getImagePath))
		.then(filePaths =>
			filePaths.length
				? Promise.all(filePaths.map(deleteFile))
				: Promise.resolve(true)
		);

const writeImage = (id, data) => fs.writeFile(getImagePath(`${id}.jpg`), data);

const writeAllImages = ids =>
	fs.open(PLACEHOLDER_IMAGE, "r")
		.then(fs.readFile)
		.then(data => Promise.all(ids.map(id => writeImage(id, data))));

export default () =>
	cleanAllPreviouslyCreatedImages()
		.then(getProductImagesIds)
		.then(writeAllImages);
