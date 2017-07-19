export default {
  "$schema":    "http://json-schema.org/schema#",
  "id":         "http://bayuk.com/schemas/myschema.json",
  "title":      "Error",
  "type":       "object",
  "properties": {
    "code": {
      "type": "string"
    },

    "title": {
      "type": "string"
    },

    "details": {
      "type": "string"
    }
  },

  "required": ["code", "title", "details"]
};