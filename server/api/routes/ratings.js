import {createRating, readRatings} from "../controllers/ratings";

export default router => {
	router.post("/ratings", createRating);

	router.get("/ratings/:userId", readRatings);

	return router;
};