import {sendJsonResponse} from "../../../utils/utils";
import {getReviews, addReview} from "../services/reviews";

export const createReview = (req, res) => {
	const review = req.body;

	addReview(review)
		.then(createdReview => {
			res.location(`/api/reviews/${createdReview.target}`);
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


