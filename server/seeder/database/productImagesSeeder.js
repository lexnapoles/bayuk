import db from "../../db";
import {wrapDataInPromise} from "../../../utils/utils";

const addProductImage = productId => db.none("INSERT INTO product_images (product_id) VALUES ($1)", productId);

export default products => {
	const productIds = Array.from(products, ({uuid}) => uuid);

	return Promise.all(wrapDataInPromise(productIds, addProductImage));
};