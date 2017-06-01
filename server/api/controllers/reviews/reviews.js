import {sendJsonResponse} from "../../../../utils/utils";
import {getReviews, addReview} from "../../services/reviews";
import {getUserById} from "../../services/users";
import {validateReview} from "./validators";
import {validateRequest} from "../validators";
import {unauthorizedAccess} from "../../../errors/api/authorizationErrors";
import {userDoesNotExist} from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";

export const readReviews = (req, res) => {
	const {userId} = req.params;

	getUserById(userId)
		.then(() => getReviews(userId))
		.then(reviews => sendJsonResponse(res, 200, reviews))
		.catch(error => {
			if (error.code === dbErrors.dataNotFound) {
				sendJsonResponse(res, 404, [userDoesNotExist()]);
				return;
			}

			sendJsonResponse(res, 500, [error]);
		});
};

export const createReview = (req, res) => {
	const requestErrors = validateRequest(req, "body");

	if (requestErrors.length) {
		sendJsonResponse(res, 400, requestErrors);
		return;
	}

	const review = req.body;

	const reviewErrors = validateReview(review);

	if (reviewErrors.length) {
		sendJsonResponse(res, 400, reviewErrors);
		return;
	}

	const source = req.user.id;

	if (source !== review.source) {
		sendJsonResponse(res, 401, [unauthorizedAccess()]);
		return;
	}

	addReview(review)
		.then(createdReview => {
			res.location(`/api/reviews/${createdReview.target}`);
			sendJsonResponse(res, 201, createdReview);
		})
		.catch(error => sendJsonResponse(res, 500, [error]))
};
