export const register = {
	"$schema":    "http://json-schema.org/schema#",
	"id":         "http://bayuk.com/schemas/myschema.json",
	"type":       "object",
	"title":      "Register",
	"properties": {
		"name":      {
			"type": "string"
		},
		"email":     {
			"type": "string"
		},
		"password":  {
			"type": "string"
		},
		"latitude":  {
			"type": "string"
		},
		"longitude": {
			"type": "string"
		}
	},
	"required":   ["name", "email", "password", "latitude", "longitude"]
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

export const user = {
	"$schema":    "http://json-schema.org/schema#",
	"id":         "http://bayuk.com/schemas/myschema.json",
	"type":       "object",
	"title":      "Userr",
	"properties": {
		"id":        {
			"type": "string"
		},
		"name":      {
			"type": "string"
		},
		"email":     {
			"type":   "string",
			"format": "email"
		},
		"latitude":  {
			"type": "number"
		},
		"longitude": {
			"type": "number"
		},
		"image":     {
			"type": ["null", "string"]
		}
	},
	"required":   ["id", "name", "image", "latitude", "longitude"]
};