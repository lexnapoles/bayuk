export const register = {
	"$schema":    "http://json-schema.org/schema#",
	"id":         "http://bayuk.com/schemas/myschema.json",
	"type":       "object",
	"title":      "Register",
	"properties": {
		"name":     {
			"type": "string"
		},
		"email":    {
			"type": "string"
		},
		"password": {
			"type": "string"
		},
		"location": {
			"type":       "object",
			"properties": {
				"latitude":  {
					"type": "string"
				},
				"longitude": {
					"type": "string"
				}
			}
		},
	},
	"required":   ["name", "email", "password", "location"]
};

export const login = {
	"$schema":    "http://json-schema.org/schema#",
	"id":         "http://bayuk.com/schemas/myschema.json",
	"type":       "object",
	"title":      "Login",
	"properties": {
		"email":    {
			"type": "string"
		},
		"password": {
			"type": "string"
		},
	},
	"required":   ["email", "password"]
};