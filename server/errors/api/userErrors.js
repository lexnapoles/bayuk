import {createError} from "./errors";

export const invalidUser = (field = "User", message) => {
  const details = `${field.length ? field : "User"} ${message}`;

  return createError(field,  "User data is invalid", details);
};

export const userAlreadyExists = () => createError("ERR-2001", "User already exists", "Found a user with the same email");

export const userDoesNotExist = () => createError("ERR-2002", "User doesn't exists", "Given user can't be found");

export const loginFailed = () => createError("ERR-2003", "Login has failed", "Incorrect email or password");

