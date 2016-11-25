import express from "express";
import {readProducts, readOneProduct, createProducts, updateOneProduct, deleteOneProduct} from "../controllers/products";

const router = express.Router();

router.get("/products", readProducts);
router.get("/products/:productId", readOneProduct);

router.post("/products", createProducts);

router.put("/products/:productId", updateOneProduct);

router.delete("/products/:productId", deleteOneProduct);

export default router;