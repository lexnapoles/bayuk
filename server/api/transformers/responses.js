export const respondWithItem = (data, transformer) => ({
	data: transformer ? transformer(data) : data
});

export const respondWithArray = (data, transformer) => ({
	data: transformer ? data.map(transformer) : data
});
