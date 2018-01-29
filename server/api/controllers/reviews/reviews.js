import { sendJsonResponse } from '../../../utils';
import { getReviews, addReview } from '../../services/reviews';
import { getUserById } from '../../services/users';
import validateReview from './validators';
import { validateRequest, validateId } from '../validators';
import { unauthorizedAccess } from '../../../errors/api/authorizationErrors';
import { userDoesNotExist } from '../../../errors/api/userErrors';
import dbErrors from '../../../errors/database';
import transformReview from '../../transformers/reviews';
import {
  errorBadRequest,
  errorNotFound,
  errorInternalError,
  errorUnauthorized,
} from '../../../errors/api/errors';
import { collection, item } from '../../transformers/transformer';

export const readReviews = async function readReviews(req, res) {
  const { userId } = req.params;

  const invalidIdError = validateId(userId);

  if (invalidIdError.length) {
    errorBadRequest(res, invalidIdError);
    return;
  }

  try {
    await getUserById(userId);

    const reviews = await getReviews(userId);
    const transformedReviews = await collection(reviews, transformReview.bind(undefined, req));

    sendJsonResponse(res, 200, transformedReviews);
  } catch (error) {
    if (error.code === dbErrors.dataNotFound) {
      errorNotFound(res, userDoesNotExist());
      return;
    }

    errorInternalError(res, [error]);
  }
};

export const createReview = async function createReview(req, res) {
  const requestErrors = validateRequest(req, 'body');

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

  try {
    const createdReview = await addReview(review);

    const transformedReview = await item(createdReview, transformReview.bind(undefined, req));

    res.location(`/api/reviews/${transformedReview.target}`);
    sendJsonResponse(res, 201, transformedReview);
  } catch (error) {
    errorInternalError(res, error);
  }
};
