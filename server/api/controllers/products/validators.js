import Ajv from "ajv";
import schema from "../../schemas/product";
import {fieldNotFound, invalidProduct} from "../../../errors/api/productErrors";
import {validateBody} from "../validators";

const getSchemaCustomErrors = (schemaErrors, customError) =>
	schemaErrors.reduce((customErrors, error) => {
		const field   = error.dataPath.split(".")[1],
					message = error.message;

		return [...customErrors, customError(field, message)];
	}, []);

export const validateProductBody = (product, fields) => validateBody(product, fields, fieldNotFound);

export const validateProduct = product => {
	const ajv      = new Ajv({allErrors: true}),
				validate = ajv.compile(schema),
				valid    = validate(product);

	if (!valid) {
		return getSchemaCustomErrors(validate.errors, invalidProduct);
	}

	return [];
};
