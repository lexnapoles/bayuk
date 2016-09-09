export const getProductById = ({products}, id) =>
	products.find(elem => elem.id === id);
