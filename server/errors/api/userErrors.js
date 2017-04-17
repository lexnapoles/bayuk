export const fieldNotFound = field => ({
	code:    "ERR-2001",
	title:   "User fields don't exist",
	details: `${field} field is not present`
});

export const userAlreadyExists = () => ({
	code:    "ERR-2002",
	title:   "User already exists",
	details: `Found a user with the same email`
});

export const userDoesNotExist = () => ({
	code:    "ERR-2003",
	title:   "User doesn't exists",
	details: `Given user can't be found`
});

export const loginFailed = () => ({
	code:    "ERR-2004",
	title:   "Login has failed",
	details: "Incorrect email or password"
});

