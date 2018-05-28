export default {
  $schema: "http://json-schema.org/schema#",
  id: "http://bayuk.com/schemas/myschema.json",
  type: "object",
  title: "Review",
  properties: {
    sourceId: {
      type: "string",
      format: "uuid"
    },

    targetId: {
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

    productId: {
      type: "string",
      format: "uuid"
    }
  },
  required: ["sourceId", "targetId", "description", "rating", "productId"]
};
