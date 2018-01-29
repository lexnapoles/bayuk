import { sendJsonResponse } from '../../utils';
import { getCategories } from '../services/categories';
import transformCategories from '../transformers/categories';
import { collection } from '../transformers/transformer';
import { errorInternalError } from '../../errors/api/errors';

export default async function getAllCategories(req, res) {
  try {
    const categories = await getCategories();
    const transformedCategories = await collection(categories, transformCategories);

    sendJsonResponse(res, 200, transformedCategories);
  } catch (error) {
    errorInternalError(res, error);
  }
}
