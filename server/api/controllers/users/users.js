import { sendJsonResponse } from '../../../utils';
import { validateUser } from './validators';
import { validateRequest, validateId } from '../validators';
import {
  getUsers,
  getUserById,
  updateUser,
  updateEmail,
  updatePassword,
  deleteUser,
} from '../../services/users';
import { createJwt } from '../../services/authentication';
import dbErrors from '../../../errors/database';
import { userDoesNotExist } from '../../../errors/api/userErrors';
import transformUser from '../../transformers/users';
import { errorBadRequest, errorNotFound, errorInternalError } from '../../../errors/api/errors';

export const readUsers = (req, res) =>
  getUsers()
    .then(users => users.map(transformUser.bind(undefined, req)))
    .then(users => sendJsonResponse(res, 200, users))
    .catch(error => errorInternalError(res, error));

export const readOneUser = (req, res) => {
  const noUserIdError = validateRequest(req.params, 'userId');

  if (noUserIdError.length) {
    errorBadRequest(res, noUserIdError);
    return;
  }

  const { userId } = req.params;
  const invalidIdError = validateId(userId);

  if (invalidIdError.length) {
    errorBadRequest(res, invalidIdError);
    return;
  }

  getUserById(userId)
    .then(transformUser.bind(undefined, req))
    .then(user => sendJsonResponse(res, 200, user))
    .catch((error) => {
      if (error.code === dbErrors.dataNotFound) {
        errorNotFound(res, userDoesNotExist());
        return;
      }

      errorInternalError(res, error);
    });
};

export const updateUserEmail = (req, res) => {
  const requestErrors = validateRequest(req, 'body');

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { userId } = req.params;
  const { email } = req.body;

  const noEmailError = validateRequest(req.body, 'email');

  if (noEmailError.length) {
    errorBadRequest(res, noEmailError);
    return;
  }

  updateEmail(userId, email)
    .then(user => sendJsonResponse(res, 200, createJwt(user)))
    .catch(error => errorInternalError(res, error));
};

export const updateUserPassword = (req, res) => {
  const requestErrors = validateRequest(req, 'body');

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { userId } = req.params;
  const { password } = req.body;

  const noPasswordError = validateRequest(req.body, 'password');

  if (noPasswordError.length) {
    errorBadRequest(res, noPasswordError);
    return;
  }

  updatePassword(userId, password)
    .then(() => sendJsonResponse(res, 204))
    .catch(error => errorInternalError(res, error));
};

export const updateOneUser = (req, res) => {
  const requestErrors = validateRequest(req, 'body');

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const user = req.body;

  const invalidUserErrors = validateUser(user);

  if (invalidUserErrors.length) {
    errorBadRequest(res, invalidUserErrors);
    return;
  }

  updateUser(user)
    .then(transformUser.bind(undefined, req))
    .then(updatedUser => sendJsonResponse(res, 200, updatedUser))
    .catch(error => errorInternalError(res, error));
};

export const deleteOneUser = (req, res) => {
  const { userId } = req.params;

  return deleteUser(userId)
    .then(() => sendJsonResponse(res, 204))
    .catch(error => errorInternalError(res, error));
};

