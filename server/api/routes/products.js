import bodyParser from "body-parser";
import jwt from "express-jwt";
import {
	readProducts,
	readOneProduct,
	createProduct,
	updateOneProduct,
	deleteOneProduct
} from "../controllers/products";

const jsonParser = bodyParser.json({limit: "50mb"});

const auth =  jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: "payload"
});

export default router => {
	router.get("/products", readProducts);
	router.get("/products/:productId", readOneProduct);

	router.post("/products", auth, jsonParser, createProduct);

	router.put("/products/:productId", auth, jsonParser, updateOneProduct);

	router.delete("/products/:productId", auth, deleteOneProduct);

	return router;
};