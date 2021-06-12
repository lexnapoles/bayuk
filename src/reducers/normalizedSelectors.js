export const getAllItems = ({ allIds, byId }) => allIds.map(id => byId[id]);

export const getItemById = ({ byId }, id) => byId[id];
