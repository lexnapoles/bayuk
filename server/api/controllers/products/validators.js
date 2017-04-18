import Ajv from "ajv";
import schema from "../../schemas/product";
import {fieldNotFound, invalidProduct} from "../../../errors/api/productErrors";
import {validateBody} from "../validators";

export const validateProductBody = (product, fields) => validateBody(product, fields, fieldNotFound);

export const validateProduct = product => {
	const ajv      = new Ajv(),
				validate = ajv.compile(schema);

	return !validate(product)
		? [invalidProduct()]
		: [];
};
