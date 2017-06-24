import Ajv from "ajv";
import {has} from "lodash/object";
import {isEmpty} from "lodash/lang";
import validateUUID from "uuid-validate";
import {dataNotFound, invalidId} from "../../errors/api/controllerErrors";
import {getSchemaCustomErrors} from "../schemas/schemaErrorUtils";

const validateObject = (obj, properties = [], validator, error) => {
	if (!Array.isArray(properties)) {
		properties = [properties];
	}

	return properties.reduce((errorMessages, property) =>
			validator(obj, property)
				? [...errorMessages, error(property)]
				: errorMessages
		, []);
};

export const validateRequest = (req, fields) => validateObject(req, fields, (req, field) => !has(req, field) || isEmpty(req[field]), dataNotFound);

export const validateId = id => validateUUID(id) ? [] : [invalidId()];

export const validateSchema = (data, schema, customError) => {
	const ajv      = new Ajv({allErrors: true}),
				validate = ajv.compile(schema),
				valid    = validate(data);

	if (!valid) {
		return getSchemaCustomErrors(validate.errors, customError);
	}

	return [];
};