import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import * as config from "./webpack.dev.config.js";

const app         = express(),
			DIST_DIR    = path.join(__dirname, "dist"),
			PORT        = 3000,
			compiler    = webpack(config),
			environment = process.env.NODE_ENV || "development";

if (environment === "development") {
	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));

	app.use(webpackHotMiddleware(compiler));

	app.get("*", (req, res, next) => {
		const filename = path.join(DIST_DIR, "index.html");

		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		});
	});
}

else {
	app.use(express.static(DIST_DIR));

	app.get("*", function (req, res) {
		res.sendFile(path.join(DIST_DIR, "index.html"));
	});

}

app.listen(PORT);