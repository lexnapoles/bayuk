import {sendJsonResponse} from "../../../utils/utils";
import {getUsers, getUserById} from "../services/users";
import {has} from "lodash/object";

export const readUsers = (req, res) =>
	getUsers()
		.then(users => sendJsonResponse(res, 200, users))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));

export const readOneUser = (req, res) => {
	if (!has(req, "params") && !has(req.params, "userId")) {
		sendJsonResponse(res, 404, {
			"message": "No userId in request"
		});
		return;
	}

	const {userId} = req.params;

	getUserById(userId)
		.then(user => sendJsonResponse(res, 200, user))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));
};

//
// export const updateOneUser = (req, res) => {
//
// };
//
// export const deleteOneUser = (req, res) => {
//
// };
