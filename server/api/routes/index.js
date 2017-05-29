import express from "express";
import productsRoutes from "./products";
import categoriesRoutes from "./categories";
import authRoutes from "./authentication";
import usersRoutes from "./users";
import reviewsRoutes from "./reviews";

const router = express.Router();

const addRoutes = (router, ...routes) => routes.reduce((updatedRouter, addRoute) => addRoute(updatedRouter), router);

export default addRoutes(
	router,
	usersRoutes,
	reviewsRoutes,
	authRoutes,
	categoriesRoutes,
	productsRoutes
);
