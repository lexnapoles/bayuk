import bodyParser from "body-parser";
import verifyUser from "../../middlewares/verifyUser";
import auth from "../../middlewares/auth";
import { createReview, readReviews } from "../controllers/reviews/reviews";

const jsonParser = bodyParser.json({ limit: "50mb" });

export default router => {
  router.get("/reviews/:userId", readReviews);

  router.post("/reviews", auth, verifyUser, jsonParser, createReview);

  return router;
};
