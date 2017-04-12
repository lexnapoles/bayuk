export default product => ({
	id:          product.uuid,
	name:        product.name,
	images:      [],
	owner:       product.owner,
	description: product.description,
	category:    product.category,
	createdAt:   product.created_at,
	price:       product.price
})