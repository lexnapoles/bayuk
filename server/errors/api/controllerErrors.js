import {createError} from "./errors";

export const dataNotFound = field => createError("ERR-0001", "No data provided", `No ${field} has been found in the request`);

export const invalidId = () => createError("ERR-0002", "Id is not valid", "Id has to be a valid uuid v4");