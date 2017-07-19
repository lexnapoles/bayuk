import {createError} from "./errors";

export const productDoesNotExist = () => createError("ERR-1000", "Product doesn't exists", "Product with the given id doesn't exist");

export const invalidProduct = (field = "Product", message) => {
  const details = `${field.length ? field : "Product"} ${message}`;

  return createError(field, "Product data is invalid", details);
};