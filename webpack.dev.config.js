import webpack from "webpack";
import merge from "webpack-merge";
import baseConfig from "./webpack.base.config"

const devConfig = merge({
	entry: ["webpack-hot-middleware/client"],

	devtool: "eval-source-map",

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}, baseConfig);


module.exports = devConfig;