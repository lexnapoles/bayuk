export default {
  $schema: 'http://json-schema.org/schema#',
  id: 'http://bayuk.com/schemas/myschema.json',
  title: 'Product',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },

    description: {
      type: 'string',
    },

    images: {
      type: 'array',
      minItems: 1,
      maxItems: 3,
    },

    category: {
      type: 'string',
    },

    price: {
      type: 'integer',
      minimum: 0,
    },

    sold: {
      type: 'boolean',
      default: 'false',
    },
  },

  required: ['name', 'description', 'images', 'category', 'price'],
};
