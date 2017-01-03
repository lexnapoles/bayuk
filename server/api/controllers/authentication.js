import passport from "passport";
import {bodyExists, propertiesExistInObj, sendJsonResponse} from "../utils/utils";
import {createJwt, addUser} from "../services/user";

export const register = (req, res) => {
	if (!bodyExists(req) || !propertiesExistInObj(req.body, ["email", "name", "password"])) {
		sendJsonResponse(res, 400, {
			"message": "All fields required"
		});
	}

	addUser(req.body)
		.then(token => sendJsonResponse(res, 200, {token}))
		.catch(error => sendJsonResponse(res, 404, error));
};

export const login = (req, res) => {
	if (!bodyExists(req) || !propertiesExistInObj(req.body, ["email", "password"])) {
		sendJsonResponse(res, 400, {
			"message": "All fields required"
		});
	}

	passport.authenticate("local", (err, user, info) => {
		if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}

		if (user) {
			sendJsonResponse(res, 200, {token: createJwt(user)});
		}
		else {
			sendJsonResponse(res, 401, info);
		}
	})(req, res);
};