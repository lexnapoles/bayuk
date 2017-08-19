import { sendJsonResponse } from '../../utils';

export const createError = (code, title, details) => ({
  code,
  title,
  details,
});

const sendError = (res, status, errors) => {
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  sendJsonResponse(res, status, errors);
};

export const errorBadRequest = (res, errors) => sendError(res, 400, errors);

export const errorNotFound = (res, errors) => sendError(res, 404, errors);

export const errorInternalError = (res, errors) => sendError(res, 500, errors);

export const errorUnauthorized = (res, errors) => sendError(res, 401, errors);

export const errorConflict = (res, errors) => sendError(res, 409, errors);
