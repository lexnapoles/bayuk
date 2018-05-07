export default {
  $schema: "http://json-schema.org/schema#",
  id: "http://bayuk.com/schemas/myschema.json",
  type: "object",
  title: "Review",
  properties: {
    source: {
      type: "string",
      format: "uuid"
    },

    target: {
      type: "string",
      format: "uuid"
    },

    description: {
      type: "string"
    },

    rating: {
      type: "integer",
      minItems: 1,
      maxItems: 5
    },

    product: {
      type: "string",
      format: "uuid"
    }
  },
  required: ["source", "target", "description", "rating", "product"]
};
