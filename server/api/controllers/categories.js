import {sendJsonResponse} from "../../utils";
import {getCategories} from "../services/categories";
import transformCategories from "../transformers/categories";
import {errorInternalError} from "../../errors/api/errors";

export const readCategories = (req, res) =>
  getCategories()
    .then(categories => categories.map(transformCategories))
    .then(categories => sendJsonResponse(res, 200, categories))
    .catch(error => errorInternalError(res, error));