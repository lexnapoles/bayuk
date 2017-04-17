export const dataNotFound = (field) => ({
	code:    "ERR-0001",
	title:   "No data provided",
	details: `No ${field} has been found in the request`
});