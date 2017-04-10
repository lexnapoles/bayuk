import merge from "webpack-merge";
import baseConfig from "./webpack.base.config.js";

export default merge({
	devtool: "cheap-module-source-map"
}, baseConfig);