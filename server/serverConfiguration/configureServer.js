import path from "path";
import devServer from "./devServer";
import prodServer from "./prodServer";

const DIST_DIR     = path.join(__dirname, "/../dist"),
			HTML_FILE    = path.join(DIST_DIR, "index.html"),
			isProduction = process.env.NODE_ENV === "production";

export default server => isProduction
	? prodServer(server, HTML_FILE)
	: devServer(server, HTML_FILE);
