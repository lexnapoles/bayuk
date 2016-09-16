export const getProductById = (state, id) => {
	return state.find(product => product.id === id);
}
