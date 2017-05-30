import bodyParser from "body-parser";
import {createReview, readReviews} from "../controllers/reviews/reviews";

const jsonParser = bodyParser.json({limit: "50mb"});

export default router => {
	router.get("/reviews/:userId", readReviews);

	router.post("/reviews", jsonParser, createReview);

	return router;
};