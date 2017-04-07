import path from "path";
import devServer from "./devServer";
import prodServer from "./prodServer";

const DIST_DIR     = path.join(__dirname, "../../dist"),
			HTML_FILE    = path.join(DIST_DIR, "index.html"),
			isProduction = process.env.NODE_ENV === "production",
			isTesting    = process.env.NODE_ENV === "test";

export default server => {
	if (isProduction) {
		return prodServer(server, HTML_FILE);
	}
	else if (isTesting) {
		return server;
	}

	return devServer(server, HTML_FILE);
};