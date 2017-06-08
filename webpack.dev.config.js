const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

const devConfig = merge({
	entry: ["webpack-hot-middleware/client"],

	devtool: "eval-source-map",

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}, baseConfig);


module.exports = devConfig;