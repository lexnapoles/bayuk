import {has} from "lodash/object";
import {fieldNotFound} from "./errors";

export const validateUserBody = (user, fields) =>
	fields.reduce((errors, field) =>
			!has(user, field)
				? [...errors, fieldNotFound(field)]
				: errors
		, []);
