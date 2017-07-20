import {sendJsonResponse} from "../../../utils";
import {getReviews, addReview} from "../../services/reviews";
import {getUserById} from "../../services/users";
import {validateReview} from "./validators";
import {validateRequest, validateId} from "../validators";
import {unauthorizedAccess} from "../../../errors/api/authorizationErrors";
import {userDoesNotExist} from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";
import {transformReview} from "../../transformers/reviews";
import {errorBadRequest, errorNotFound, errorInternalError, errorUnauthorized} from "../../../errors/api/errors";

export const readReviews = (req, res) => {
  const {userId} = req.params;

  const invalidIdError = validateId(userId);

  if (invalidIdError.length) {
    errorBadRequest(res, invalidIdError);
    return;
  }

  getUserById(userId)
    .then(() => getReviews(userId))
    .then(reviews => reviews.map(transformReview.bind(void 0, req)))
    .then(reviews => sendJsonResponse(res, 200, reviews))
    .catch(error => {
      if (error.code === dbErrors.dataNotFound) {
        errorNotFound(res, userDoesNotExist());
        return;
      }

      errorInternalError(res, [error]);
    });
};

export const createReview = (req, res) => {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const review = req.body;

  const reviewErrors = validateReview(review);

  if (reviewErrors.length) {
    errorBadRequest(res, reviewErrors);
    return;
  }

  const source = req.user.id;

  if (source !== review.source) {
    errorUnauthorized(res, unauthorizedAccess());
    return;
  }

  addReview(review)
    .then(createdReview => {
      res.location(`/api/reviews/${createdReview.target}`);
      sendJsonResponse(res, 201, createdReview);
    })
    .catch(error => errorInternalError(res, error));
};
