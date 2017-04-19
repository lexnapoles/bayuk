import Ajv from "ajv";
import schema from "../../schemas/product";
import {fieldNotFound, invalidProduct} from "../../../errors/api/productErrors";
import {validateBody} from "../validators";

const getSchemaErrorMessageAndField = error => {
	let field   = "",
			message = "";

	if (error.params.missingProperty) {
		const messageWithNoField = error.message.match(/([a-zA-Z ]+)/)[1];

		message = `${messageWithNoField}${error.params.missingProperty}`;
	}

	else {
		field = error.dataPath.split(".")[1];
		message = error.message;
	}

	return {
		message,
		field
	}
};

const getSchemaCustomErrors = (schemaErrors, customError) =>
	schemaErrors.reduce((customErrors, error) => {
		const {field, message} = getSchemaErrorMessageAndField(error);

		return [...customErrors, customError(field, message)];
	}, []);

export const validateProduct = product => {
	const ajv      = new Ajv({allErrors: true}),
				validate = ajv.compile(schema),
				valid    = validate(product);

	if (!valid) {
		return getSchemaCustomErrors(validate.errors, invalidProduct);
	}

	return [];
};
