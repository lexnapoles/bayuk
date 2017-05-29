import {createReview, readReviews} from "../controllers/reviews";

export default router => {
	router.get("/:userId/reviews", readReviews);

	router.post("/:userId/reviews", createReview);

	return router;
};