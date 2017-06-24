import {sendJsonResponse} from "../../utils";
import {getCategories} from "../services/categories";
import transformCategories from "../transformers/categories";

export const readCategories = (req, res) =>
	getCategories()
		.then(categories => categories.map(transformCategories))
		.then(categories => sendJsonResponse(res, 200, categories))
		.catch(error => sendJsonResponse(res, 500, [error]));