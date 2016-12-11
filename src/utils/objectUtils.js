export const createDefaultObjectFrom = (base = {}, defaultValue = "") => {
	const keys = Array.isArray(base) ? base : Object.keys(base);

	return keys.reduce((obj, key) => ({
		...obj,
		[key]: defaultValue
	}),	{});
};