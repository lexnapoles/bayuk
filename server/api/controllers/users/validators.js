import {has} from "lodash/object";
import {fieldNotFound} from "./errors";

export const validateUserBody = user => {
	const fields = ["email", "name", "password"];

	return fields.reduce((errors, field) =>
			!has(user, field)
				? [...errors, fieldNotFound(field)]
				: errors
		, []);
};
