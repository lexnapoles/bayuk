import path     from "path";
import merge from "webpack-merge";
import baseConfig from "./webpack.base.config.js";

export default merge(baseConfig, {
	entry: null,

	externals: {
		"cheerio":                        "window",
		"react/addons":                   "react",
		"react/lib/ExecutionEnvironment": "react",
		"react/lib/ReactContext":         "react"
	},

	devtool: "inline-source-map",

	resolve: {
		alias: {
			Components: path.resolve(__dirname, "src/components")
		}
	}
});

