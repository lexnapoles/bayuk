import {sendJsonResponse} from "../../../utils/utils";
import {getReviews} from "../services/reviews";

export const createReview = (req, res) => {
	return;
};

export const readReviews = (req, res) => {
	const {userId} = req.params;

	return getReviews(userId)
		.then(reviews => sendJsonResponse(res, 200, reviews));

};


