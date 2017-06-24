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

export const getSchemaCustomErrors = (schemaErrors, customError) =>
	schemaErrors.reduce((customErrors, error) => {
		const {field, message} = getSchemaErrorMessageAndField(error);

		return [...customErrors, customError(field, message)];
	}, []);
