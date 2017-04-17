import {has} from "lodash/object";
import {fieldNotFound} from "./errors";

export const validateProductBody = (product, fields) =>
	fields.reduce((errors, field) =>
			!has(product, field)
				? [...errors, fieldNotFound(field)]
				: errors
		, []);
