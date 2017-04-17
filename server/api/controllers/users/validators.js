import {fieldNotFound} from "./errors";
import {validateBody} from "../validators";

export const validateUserBody = (user, fields) => validateBody(user, fields, fieldNotFound);
