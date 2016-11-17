export const createDefaultObjectFrom = (obj = {}, defaultValue = "") => {
	const keys = Object.keys(obj);

	return keys.reduce((obj, key) =>
		Object.assign(obj, {
			[key]: defaultValue
		}), {});
}