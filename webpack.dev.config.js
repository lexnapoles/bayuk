const webpack    = require("webpack"),
			merge      = require("webpack-merge"),
			baseConfig = require("./webpack.base.config.js");

const devConfig = merge({
	entry: ["webpack-hot-middleware/client"],

	devtool: "eval-source-map",

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}, baseConfig);



module.exports = devConfig;