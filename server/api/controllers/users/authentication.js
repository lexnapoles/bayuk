import passport from "passport";
import {sendJsonResponse} from "../../../../utils/utils";
import {addUser} from "../../services/users";
import {createJwt} from "../../services/authentication";
import {has} from "lodash/object";
import {hasProperties} from "../../../../utils/utils";
import {validateUserBody} from "./validators";
import {validateRequest} from "../validators";

export const register = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const userBodyErrors = validateUserBody(req.body);

	if (userBodyErrors.length) {
		sendJsonResponse(res, 400, userBodyErrors);
		return;
	}

	addUser(req.body)
		.then(({user, token}) => {
			res.location(`/api/users/${user.id}`);
			sendJsonResponse(res, 201, token);
		})
		.catch(error => sendJsonResponse(res, 404, {error}));
};

export const login = (req, res) => {
	if (!has(req, "body") || !hasProperties(req.body, ["email", "password"])) {
		sendJsonResponse(res, 400, {
			"message": "All fields required"
		});
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
		}
		else {
			sendJsonResponse(res, 401, info);
		}
	})(req, res);
};