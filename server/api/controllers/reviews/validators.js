import {validateSchema} from "../validators";
import reviewSchema from "../../schemas/review";
import {invalidReview} from "../../../errors/api/reviewErrors"

export const validateReview = review => validateSchema(review, reviewSchema, invalidReview);
