import {dataExists, sendJsonResponse} from "../utils/utils";
import {addUser} from "../services/user";

export const createUser = (req, res) => {
		if (!dataExists(req)) {
			sendJsonResponse(res, 404, "No user data");
		}

		addUser(req.body)
			.then(msg => sendJsonResponse(res, 201, msg))
			.catch(error => sendJsonResponse(res, 404, error));
	};