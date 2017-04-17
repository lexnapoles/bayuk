import {fieldNotFound} from "./errors";
import {validateBody} from "../validators";

export const validateProductBody = (product, fields) => validateBody(product, fields, fieldNotFound);
