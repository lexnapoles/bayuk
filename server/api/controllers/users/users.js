import {sendJsonResponse} from "../../../../utils/utils";
import {validateRequest} from "../validators";
import {validateId} from "../validators";
import {getUsers, getUserById, updateUser, updateEmail, updatePassword, deleteUser} from "../../services/users";
import {createJwt} from "../../services/authentication";
import {has} from "lodash/object";
import {validateUser} from "./validators"

export const readUsers = (req, res) =>
	getUsers()
		.then(users => sendJsonResponse(res, 200, users))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));

export const readOneUser = (req, res) => {
	const noUserIdError = validateRequest(req.params, "userId");

	if (noUserIdError.length) {
		sendJsonResponse(res, 400, noUserIdError);
		return;
	}

	const {userId}       = req.params,
				invalidIdError = validateId(userId);

	if (invalidIdError.length) {
		sendJsonResponse(res, 400, invalidIdError);
		return;
	}

	getUserById(userId)
		.then(user => sendJsonResponse(res, 200, user))
		.catch(error => sendJsonResponse(res, 404, {"message": error}));
};

export const updateUserEmail = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const {userId} = req.params,
				{email}  = req.body;

	const noEmailError = validateRequest(req.body, "email");

	if (noEmailError.length) {
		sendJsonResponse(res, 400, noEmailError);
		return
	}

	updateEmail(userId, email)
		.then(user => sendJsonResponse(res, 200, createJwt(user)))
		.catch(error => sendJsonResponse(res, 500, [error]))
};

export const updateUserPassword = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const {userId}   = req.params,
				{password} = req.body;

	const noPasswordError = validateRequest(req.body, "password");

	if (noPasswordError.length) {
		sendJsonResponse(res, 400, noPasswordError);
		return
	}

	updatePassword(userId, password)
		.then(() => sendJsonResponse(res, 204))
		.catch(error => sendJsonResponse(res, 500, [error]))
};

export const updateOneUser = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const user = req.body;

	const invalidUserErrors = validateUser(user);

	if (invalidUserErrors.length) {
		sendJsonResponse(res, 400, invalidUserErrors);
		return;
	}

	updateUser(user)
		.then(user => sendJsonResponse(res, 200, user))
		.catch(error => sendJsonResponse(res, 500, [error]));

};

export const deleteOneUser = (req, res) => {
	const {userId} = req.params;

	return deleteUser(userId)
		.then(() => sendJsonResponse(res, 204))
		.catch(error => sendJsonResponse(res, 500, [error]))
};

