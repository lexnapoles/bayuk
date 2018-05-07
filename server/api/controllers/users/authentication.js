import passport from "passport";
import { sendJsonResponse } from "../../../utils";
import { addUser } from "../../services/users";
import { createJwt } from "../../services/authentication";
import { validateRegister, validateLogin } from "./validators";
import { validateRequest } from "../validators";
import { userAlreadyExists } from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";
import transformUser from "../../transformers/users";
import { item } from "../../transformers/transformer";
import {
  errorBadRequest,
  errorNotFound,
  errorUnauthorized,
  errorInternalError,
  errorConflict
} from "../../../errors/api/errors";

export const register = async function register(req, res) {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const invalidErrors = validateRegister(req.body);

  if (invalidErrors.length) {
    errorBadRequest(res, invalidErrors);
    return;
  }

  try {
    const user = await addUser(req.body);
    const transformedUser = await item(
      user,
      transformUser.bind(undefined, req)
    );

    res.location(`/api/users/${transformedUser.id}`);
    sendJsonResponse(res, 201, createJwt(transformedUser));
  } catch (error) {
    if (error.code === dbErrors.dataAlreadyExists) {
      errorConflict(res, userAlreadyExists());
    } else {
      errorInternalError(res, error);
    }
  }
};

export const login = (req, res) => {
  const requestErrors = validateRequest(req, "body");

  if (requestErrors.length) {
    errorBadRequest(res, requestErrors);
    return;
  }

  const invalidErrors = validateLogin(req.body);

  if (invalidErrors.length) {
    errorBadRequest(res, invalidErrors);
    return;
  }

  passport.authenticate("local", async function authenticate(err, user, info) {
    if (err) {
      errorNotFound(res, err);
      return;
    }

    if (user) {
      const transformedUser = await item(
        user,
        transformUser.bind(undefined, req)
      );
      res.location(`/api/users/${user.id}`);

      sendJsonResponse(res, 201, createJwt(transformedUser));
    } else {
      errorUnauthorized(res, info);
    }
  })(req, res);
};
