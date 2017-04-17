import {fieldNotFound} from "../../../errors/api/userErrors";
import {validateBody} from "../validators";

export const validateUserBody = (user, fields) => validateBody(user, fields, fieldNotFound);
