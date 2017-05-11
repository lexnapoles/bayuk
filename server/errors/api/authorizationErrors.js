export const unauthorizedAccess = () => ({
	code:    "ERR-3000",
	title:   "Unauthorized access",
	details: "Access cannot be granted based on the given token"
});

export const tokenDoesNotMatchUser = () => ({
	code:    "ERR-3001",
	title:   "Token does not match user",
	details: "Token is invalid for this user"
});