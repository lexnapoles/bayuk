import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import * as config from "../../webpack.dev.config.js";
import seedDB from "../seeder/databaseSeeder";

export default (server, fileToServe) => {
	seedDB();

	const compiler = webpack(config);

	server.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	}));

	server.use(webpackHotMiddleware(compiler));

	server.get("*", (req, res, next) => {
		compiler.outputFileSystem.readFile(fileToServe, (err, result) => {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		});
	});

	return server;
}
