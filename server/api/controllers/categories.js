import {sendJsonResponse} from "../../../utils/utils";
import {getCategories} from "../services/categories";
import transformCategories from "../transformers/categories";

export const readCategories = (req, res) =>
	getCategories()
		.then(transformCategories)
		.then(categories => sendJsonResponse(res, 200, categories))
		.catch(() => sendJsonResponse(res, 404, {
			"message": "Could not find any categories"
		}));