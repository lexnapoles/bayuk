import express from "express";
import path from "path";
import configureServer from "./serverConfiguration/configureServer";
import "./db";
import apiRoutes from "./api/routes/index";

const DEFAULT_PORT = 3000;

let app = express();

app.set("port", process.env.PORT || DEFAULT_PORT);

app.use("/image", express.static(path.join(process.env.IMAGESDIR, "/products")));

app.use("/api", apiRoutes);

configureServer(app);

app.listen(app.get("port"));