import {pick} from "lodash/object";
import {intersection} from "lodash/array";

export const getSelectedFields = (object, fields) => {
	if (fields) {
		const fieldsInObject = intersection(Object.keys(object), fields);

		return fieldsInObject.length ? pick(object, fieldsInObject) : object;
	}

	return object;
};
