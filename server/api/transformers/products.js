export default product => ({
	id:          product.uuid,
	name:        product.name,
	owner:       product.owner,
	description: product.description,
	category:    product.category,
	createdAt:   product.created_at,
	price:       product.price
})