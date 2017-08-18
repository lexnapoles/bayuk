import validateSchema from '../../../schemas/validateSchema';
import reviewSchema from '../../../schemas/review';
import invalidReview from '../../../errors/api/reviewErrors';

export default review => validateSchema(review, reviewSchema, invalidReview);
