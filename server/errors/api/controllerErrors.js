export const dataNotFound = (field) => ({
	code:    "ERR-0001",
	title:   "No data provided",
	details: `No ${field} has been found in the request`
});

export const invalidId = () => ({
	code:    "ERR-0002",
	title:   "Id is not valid",
	details: "Id has to be a valid uuid v4"
});