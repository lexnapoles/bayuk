import bodyParser from "body-parser";
import {
	readProducts,
	readOneProduct,
	createProduct,
	updateOneProduct,
	deleteOneProduct
} from "../controllers/products";

const jsonParser = bodyParser.json({limit: "50mb"});

export default router => {
	router.get("/products", readProducts);
	router.get("/products/:productId", readOneProduct);

	router.post("/products", jsonParser, createProduct);

	router.put("/products/:productId", jsonParser, updateOneProduct);

	router.delete("/products/:productId", deleteOneProduct);

	return router;
};