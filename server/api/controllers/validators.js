import {has} from "lodash/object";
import {isEmpty} from "lodash/lang";
import {dataNotFound} from "../../errors/api/controllerErrors";

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

export const validateBody = (body, fields, fieldNotFound) => validateObject(body, fields, (body, field) => !has(body, field), fieldNotFound);