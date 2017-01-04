import {sendJsonResponse} from "../../utils/utils";
import {getCategories} from "../services/categories";

export const readCategories = (req, res) =>
	getCategories()
		.then(categories => sendJsonResponse(res, 200, categories))
		.catch(() => sendJsonResponse(res, 404, {
			"message": "Could not find any categories"
		}));