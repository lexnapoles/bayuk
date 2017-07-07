import passport from "passport";
import {sendJsonResponse} from "../../../utils";
import {addUser} from "../../services/users";
import {createJwt} from "../../services/authentication";
import {validateRegister, validateLogin} from "./validators";
import {validateRequest} from "../validators";
import {userAlreadyExists} from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";

export const register = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const invalidErrors = validateRegister(req.body);

	if (invalidErrors.length) {
		sendJsonResponse(res, 400, invalidErrors);
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
				return;
			}

			sendJsonResponse(res, 500, [error]);
		});
};

export const login = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const invalidErrors = validateLogin(req.body);

	if (invalidErrors.length) {
		sendJsonResponse(res, 400, invalidErrors);
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