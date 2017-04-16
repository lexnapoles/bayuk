export const fieldNotFound = field => ({
	code:    "ERR-2001",
	title:   "User fields don't exist",
	details: `${field} field is not present`
});

export const userAlreadyExists = () => ({
	code:    "ERR-2002",
	title:   "User already exists",
	details: `Found a user with the same email`
})