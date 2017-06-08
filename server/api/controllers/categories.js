import {sendJsonResponse} from "../../utils";
import {getCategories} from "../services/categories";
import transformCategories from "../transformers/categories";

export const readCategories = (req, res) =>
	getCategories()
		.then(categories => categories.map(transformCategories))
		.then(categories => sendJsonResponse(res, 200, categories))
		.catch(() => sendJsonResponse(res, 404, {
			"message": "Could not find any categories"
		}));