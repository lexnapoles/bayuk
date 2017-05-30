export default {
	"$schema":    "http://json-schema.org/schema#",
	"id":         "http://bayuk.com/schemas/myschema.json",
	"type":       "object",
	"title":      "Review",
	"properties": {
		"buyer": {
			"type":   "string",
			"format": "uuid"
		},

		"seller": {
			"type":   "string",
			"format": "uuid"
		},

		"description": {
			"type": "string"
		},

		"rating": {
			"type":     "integer",
			"minItems": 1,
			"maxItems": 5
		},
		
		"product": {
			"type":   "string",
			"format": "uuid"
		},
	},
	"required":   ["buyer", "seller", "description", "rating", "product"]
};