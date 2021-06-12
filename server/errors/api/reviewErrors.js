import { createError } from "./errors";

export default (field = "Review", message) => {
  const details = `${field.length ? field : "Review"} ${message}`;

  return createError(field, "Review data is invalid", details);
};
