import passport from "passport";
import {sendJsonResponse} from "../../../../utils/utils";
import {addUser} from "../../services/users";
import {createJwt} from "../../services/authentication";
import {validateUserBody} from "./validators";
import {validateRequest} from "../validators";
import {userAlreadyExists} from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";

export const register = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const userFields = ["email", "password", "name"],
				userBodyErrors = validateUserBody(req.body, userFields);

	if (userBodyErrors.length) {
		sendJsonResponse(res, 400, userBodyErrors);
		return;
	}

	addUser(req.body)
		.then(({user, token}) => {
			res.location(`/api/users/${user.id}`);
			sendJsonResponse(res, 201, token);
		})
		.catch(error => {
			if (error.code === dbErrors.dataAlreadyExists) {
				sendJsonResponse(res, 409, [userAlreadyExists()]);
			}
		});
};

export const login = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const userFields = ["email", "password"],
				userBodyErrors = validateUserBody(req.body, userFields);

	if (userBodyErrors.length) {
		sendJsonResponse(res, 400, userBodyErrors);
		return;
	}

	passport.authenticate("local", (err, user, info) => {
		if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}

		if (user) {
			res.location(`/api/users/${user.id}`);
			sendJsonResponse(res, 201, createJwt(user));
			return;
		}
		else {
			sendJsonResponse(res, 401, [info]);
			return;
		}
	})(req, res);
};