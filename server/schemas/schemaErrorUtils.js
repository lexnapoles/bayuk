const getSchemaErrorMessageAndField = (error) => {
  let field = '';
  let message = '';

  if (error.params.missingProperty) {
    const messageWithNoField = error.message.match(/([a-zA-Z ]+)/)[1];

    message = `${messageWithNoField}${error.params.missingProperty}`;
  } else {
    field = error.dataPath.split('.')[1];
    message = error.message;
  }

  return {
    message,
    field,
  };
};

export default (schemaErrors, customError) =>
  schemaErrors.reduce((customErrors, error) => {
    const { field: errorField, message } = getSchemaErrorMessageAndField(error);

    const field = errorField.length ? errorField : undefined;

    return [...customErrors, customError(field, message)];
  }, []);
