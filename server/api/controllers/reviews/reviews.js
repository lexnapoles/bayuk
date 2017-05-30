import {sendJsonResponse} from "../../../../utils/utils";
import {getReviews, addReview} from "../../services/reviews";
import {validateReview} from "./validators";
import {validateRequest} from "../validators";
import {unauthorizedAccess} from "../../../errors/api/authorizationErrors";

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

	const buyer = req.user.id;

	if (buyer !== review.buyer) {
		sendJsonResponse(res, 401, [unauthorizedAccess()]);
		return;
	}

	addReview(review)
		.then(createdReview => {
			res.location(`/api/reviews/${createdReview.seller}`);
			sendJsonResponse(res, 201, createdReview);
		})
		.catch(error => sendJsonResponse(res, 500, [error]))
};

export const readReviews = (req, res) => {
	const {userId} = req.params;

	getReviews(userId)
		.then(reviews => sendJsonResponse(res, 200, reviews))
		.catch(error => sendJsonResponse(res, 500, [error]));
};


