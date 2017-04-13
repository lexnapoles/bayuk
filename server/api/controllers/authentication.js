import passport from "passport";
import {sendJsonResponse} from "../../../utils/utils";
import {addUser} from "../services/users";
import {createJwt} from "../services/authentication";
import {respondWithItem} from "../transformers/responses";
import {has} from "lodash/object";
import {hasProperties} from "../../../utils/utils";

export const register = (req, res) => {
	if (!has(req, "body") || !hasProperties(req.body, ["email", "name", "password"])) {
		sendJsonResponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	addUser(req.body)
		.then(({user, token}) => {
			res.location(`/api/users/${user.id}`);
			sendJsonResponse(res, 201, respondWithItem(token))
		})
		.catch(error => sendJsonResponse(res, 404,  {error}));
};

export const login = (req, res) => {
	if (!has(req, "body") && !hasProperties(req.body, ["email", "password"])) {
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
			sendJsonResponse(res, 200, {token: createJwt(user)});
		}
		else {
			sendJsonResponse(res, 401, info);
		}
	})(req, res);
};