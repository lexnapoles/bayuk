import Ajv from "ajv";
import {getSchemaCustomErrors} from "./schemaErrorUtils";

export default (data, schema, error) => {
  const ajv      = new Ajv({allErrors: true}),
        validate = ajv.compile(schema),
        valid    = validate(data);

  if (!valid) {
    return error ? getSchemaCustomErrors(validate.errors, error) : validate.errors;
  }

  return [];
};