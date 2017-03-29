const webpack = require("webpack"),
			path    = require("path");

const DIST_DIR   = path.resolve(__dirname, "dist"),
			CLIENT_DIR = path.resolve(__dirname, "src");

module.exports = {
	context: CLIENT_DIR,

	entry: ["./main"],

	output: {
		path:       DIST_DIR,
		filename:   "bundle.js",
		publicPath: "/"
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "eslint-loader"
			},

			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "babel-loader"
			},

			{
				test:    /\.css$/,
				exclude: /src/,
				use:     [
					{loader: "style-loader"},
					{
						loader:  "css-loader",
						options: {
							importLoaders:  1,
							modules:        true,
							localIdentName: "[name]__[local]___[hash:base64:5]"
						}
					},
					{loader: "postcss-loader"}
				]
			},

			{
				test:    /\.css$/,
				exclude: /node_modules/,
				use:     [
					{loader: "style-loader"},
					{
						loader:  "css-loader",
						options: {
							importLoaders: 1
						}
					},
					{loader: "postcss-loader"}
				]
			},

			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use:  {
					loader:  "url-loader",
					options: {
						limit:    10000,
						mimetype: "application/font-woff"
					}
				}
			},

			{
				test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			}
		]
	},

	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV'])
	]
};


