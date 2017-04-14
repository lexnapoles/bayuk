export const fieldNotFound = field => ({
	code:    "ERR-2001",
	title:   "User fields don't exist",
	details: `${field} field is not present`
});
