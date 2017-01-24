import express from "express";
import productRoutes from "./products";
import categoryRoutes from "./categories";
import authRoutes from "./authentication";
import userRoutes from "./users";

const router = express.Router();

const addRoutes = (router, ...routes) => routes.reduce((updatedRouter, addRoute) => addRoute(updatedRouter), router);

export default addRoutes(
	router,
	userRoutes,
	authRoutes,
	categoryRoutes,
	productRoutes
);
