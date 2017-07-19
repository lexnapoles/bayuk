import {sendJsonResponse} from "../../utils";
import errorSchema from "./schema";
import validateSchema from "../../schemas/validateSchema";

const validateError = error => validateSchema(error, errorSchema);

const isError = error => {
  const invalidError = validateError(error);

  return !invalidError.length;
};

export const createError = (code, title, details) => ({
  code,
  title,
  details
});

const sendError = (res, status, errors) => {
  if (!errors) {
    throw  new Error("There are no errors to send");
  }

  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  if (!errors.every(isError)) {
    throw new Error("Errors don't comply with error format");
  }

  sendJsonResponse(res, status, errors);
};

export const errorBadRequest = (res, errors) => sendError(res, 400, errors);

export const errorNotFound = (res, errors) => sendError(res, 404, errors);

export const errorInternalError = (res, errors) => sendError(res, 500, errors);

export const errorUnauthorized = (res, errors) => sendError(res, 401, errors);

export const errorConflict = (res, errors) => sendError(res, 409, errors);