import { sendJsonResponse } from "../../../utils";
import { validateUser } from "./validators";
import { validateRequest, validateId } from "../validators";
import {
  getUsers,
  getUserById,
  updateUser,
  updateEmail,
  updatePassword,
  deleteUser
} from "../../services/users";
import { createJwt } from "../../services/authentication";
import dbErrors from "../../../errors/database";
import { userDoesNotExist } from "../../../errors/api/userErrors";
import transformUser from "../../transformers/users";
import { collection, item } from "../../transformers/transformer";
import {
  errorBadRequest,
  errorNotFound,
  errorInternalError
} from "../../../errors/api/errors";

export const readUsers = async function readUsers(req, res) {
  try {
    const users = await getUsers();
    const transformedUsers = await collection(
      users,
      transformUser.bind(undefined, req)
    );

    sendJsonResponse(res, 200, transformedUsers);
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const readOneUser = async function readOneUser(req, res) {
  const noUserIdError = validateRequest(req.params, "userId");

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

  try {
    const user = await getUserById(userId);
    const transformedUser = await item(
      user,
      transformUser.bind(undefined, req)
    );

    sendJsonResponse(res, 200, transformedUser);
  } catch (error) {
    if (error.code === dbErrors.dataNotFound) {
      errorNotFound(res, userDoesNotExist());
      return;
    }
    errorInternalError(res, error);
  }
};

export const updateUserEmail = async function updateUserEmail(req, res) {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { userId } = req.params;
  const { email } = req.body;

  const noEmailError = validateRequest(req.body, "email");

  if (noEmailError.length) {
    errorBadRequest(res, noEmailError);
    return;
  }

  try {
    const user = await updateEmail(userId, email);

    sendJsonResponse(res, 200, createJwt(user));
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const updateUserPassword = async function updateUserPassword(req, res) {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const { userId } = req.params;
  const { password } = req.body;

  const noPasswordError = validateRequest(req.body, "password");

  if (noPasswordError.length) {
    errorBadRequest(res, noPasswordError);
    return;
  }

  try {
    await updatePassword(userId, password);

    sendJsonResponse(res, 204);
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const updateOneUser = async function updateOneUser(req, res) {
  const requestErrors = validateRequest(req, "body");

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

  try {
    const updatedUser = await updateUser(user);
    const transformedUser = await item(
      updatedUser,
      transformUser.bind(undefined, req)
    );

    sendJsonResponse(res, 200, transformedUser);
  } catch (error) {
    errorInternalError(res, error);
  }
};

export const deleteOneUser = async function deleteOneUser(req, res) {
  const { userId } = req.params;

  try {
    await deleteUser(userId);

    sendJsonResponse(res, 204);
  } catch (error) {
    errorInternalError(res, error);
  }
};
