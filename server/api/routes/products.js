import {
	readProducts,
	readOneProduct,
	createProducts,
	updateOneProduct,
	deleteOneProduct
} from "../controllers/products";

export default router => {
	router.get("/products", readProducts);
	router.get("/products/:productId", readOneProduct);

	router.post("/products", createProducts);

	router.put("/products/:productId", updateOneProduct);

	router.delete("/products/:productId", deleteOneProduct);

	return router;
};