import {
	readProducts,
	readOneProduct,
	createProduct,
	updateOneProduct,
	deleteOneProduct
} from "../controllers/products";

export default router => {
	router.get("/products", readProducts);
	router.get("/products/:productId", readOneProduct);

	router.post("/products", createProduct);

	router.put("/products/:productId", updateOneProduct);

	router.delete("/products/:productId", deleteOneProduct);

	return router;
};