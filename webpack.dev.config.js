var webpack    = require("webpack"),
		baseConfig = require("./webpack.base.config.js");

baseConfig.entry = ["webpack-hot-middleware/client", "./main"];

baseConfig.output.publicPath = "/";

baseConfig.plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = baseConfig;