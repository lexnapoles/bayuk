import express from "express";
import path from "path";
import {sendJsonResponse} from "./utils/utils";
import passport from "passport";
import configureServer from "./serverConfiguration/configureServer";
import "./db";
import apiRoutes from "./api/routes/index";

import "./api/passport";

const DEFAULT_PORT = 3000;

let app = express();

app.set("port", process.env.PORT || DEFAULT_PORT);

app.use("/image", express.static(path.join(process.env.IMAGESDIR, "/products")));

app.use(passport.initialize());

app.use("/api", apiRoutes);

app.use(function(err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		sendJsonResponse(res, 401, {
			"message": `${err.name}: ${err.message}`
		});
	}
});

configureServer(app);

app.listen(app.get("port"));