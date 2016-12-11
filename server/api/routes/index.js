import express from "express";
import addProductRoutes from "./products";
import addCategoryRoutes from "./categories";

const router = express.Router();

export default addCategoryRoutes(addProductRoutes(router));

