import {fieldNotFound} from "../../../errors/api/productErrors";
import {validateBody} from "../validators";

export const validateProductBody = (product, fields) => validateBody(product, fields, fieldNotFound);
