export const getAllItems = ({allIds, byId, isFetching = false}) => ({
	items: allIds.map(id => byId[id]),
	isFetching
});

export const getItemById = ({byId, isFetching = false}, id) => ({
	item: byId[id],
	isFetching
});
