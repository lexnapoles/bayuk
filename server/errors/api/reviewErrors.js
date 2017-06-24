export const invalidReview = (field = "Review", message) => ({
	code: "ERR-4001",
	title: "Review data is invalid",
	details: `${field.length ? field : "Review"} ${message}`
});
