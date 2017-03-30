import merge from "webpack-merge";
import baseConfig from "./webpack.base.config.js";

const prodConfig = merge({
	devtool: "cheap-module-source-map"
}, baseConfig);

module.exports = prodConfig;