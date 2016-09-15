export const getProductById = (state, id) => {
	window.console.log("getProduct");
	window.console.log(state);
	window.console.log(id);


	window.console.log(state.find(product => product.id === id));
		return state.find(product => product.id === id);
}
