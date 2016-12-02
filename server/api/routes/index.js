import express from "express";
import addProductRoutes from "./products";

const router = express.Router();

export default addProductRoutes(router);

