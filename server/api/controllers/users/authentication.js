import passport from "passport";
import {sendJsonResponse} from "../../../utils";
import {addUser} from "../../services/users";
import {createJwt} from "../../services/authentication";
import {validateRegister, validateLogin} from "./validators";
import {validateRequest} from "../validators";
import {userAlreadyExists} from "../../../errors/api/userErrors";
import dbErrors from "../../../errors/database";
import transformUser from "../../transformers/users";
import {errorBadRequest, errorNotFound, errorUnauthorized, errorInternalError, errorConflict} from "../../../errors/api/errors";

export const register = (req, res) => {
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

  addUser(req.body)
    .then(user => {
      res.location(`/api/users/${user.id}`);
      sendJsonResponse(res, 201, createJwt(transformUser(req, user)));
    })
    .catch(error => {
      if (error.code === dbErrors.dataAlreadyExists) {
        errorConflict(res, userAlreadyExists());
        return;
      }

      errorInternalError(res, error);
    });
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

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      errorNotFound(res, err);
      return;
    }

    if (user) {
      res.location(`/api/users/${user.id}`);
      sendJsonResponse(res, 201, createJwt(transformUser(req, user)));
      return;
    }
    else {
      errorUnauthorized(res, info);
      return;
    }
  })(req, res);
};