import express from "express";
import configureServer from "./serverConfiguration/configureServer";
import "./db";
import apiRoutes from "./api/routes/index";

const DEFAULT_PORT = 3000;

let app = express();

app.set("port", process.env.PORT || DEFAULT_PORT);

app.get("/api", apiRoutes);

configureServer(app);

app.listen(app.get("port"));