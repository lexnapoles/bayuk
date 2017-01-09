export const createDefaultObjectFrom = (base = {}, defaultValue = "") => {
	const keys = Array.isArray(base) ? base : Object.keys(base);

	return keys.reduce((obj, key) => ({
		...obj,
		[key]: defaultValue
	}),	{});
};

export const getErrorMessage = payload => payload.response.message;

export const getImagePath = imageId => `/image/${imageId}.jpg`;


