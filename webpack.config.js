(function () {
	var path = require("path");
	var webpack = require("webpack");

	var DIST_DIR   = path.join(__dirname, "dist"),
			CLIENT_DIR = path.join(__dirname, "src");

	module.exports = {
		context: CLIENT_DIR,

		entry: ["webpack-hot-middleware/client", "./main"],

		output: {
			path:       DIST_DIR,
			publicPath: "/",
			filename:   "bundle.js"
		},

		devtool: "inline-source-map",

		plugins: [

			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		],

		module: {
			preLoaders: [
				{
					test:    /\.js$/,
					exclude: /node_modules/,
					loader:  "eslint-loader"
				}
			],

			loaders: [
				{
					test:    /\.jsx?$/,
					exclude: /node_modules/,
					loader:  "babel-loader"
				},

				{
					test:    /\.css$/,
					exclude: /node_modules/,
					loader:  "style-loader!css-loader!autoprefixer-loader"
				},

				{
					test:    /\.(png|jpg|ttf|eot)$/,
					exclude: /node_modules/,
					loader:  "url-loader?limit=10000"
				}
			]
		},

		resolve: {
			extensions: ['', '.js', '.jsx']
		}
	};
})();