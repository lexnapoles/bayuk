export const invalidUser = (field = "User", message) => ({
	code: "ERR-2000",
	title: "User data is invalid",
	details: `${field.length ? field : "User"} ${message}`
});

export const userAlreadyExists = () => ({
	code:    "ERR-2001",
	title:   "User already exists",
	details: `Found a user with the same email`
});

export const userDoesNotExist = () => ({
	code:    "ERR-2002",
	title:   "User doesn't exists",
	details: `Given user can't be found`
});

export const loginFailed = () => ({
	code:    "ERR-2003",
	title:   "Login has failed",
	details: "Incorrect email or password"
});

