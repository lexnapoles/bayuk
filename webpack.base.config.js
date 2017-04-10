import webpack from "webpack";
import path from "path";

const DIST_DIR   = path.resolve(__dirname, "dist"),
			CLIENT_DIR = path.resolve(__dirname, "src");

export default {
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
				test:    /\.js$/,
				exclude: /node_modules/,
				use:     [
					"babel-loader",
					"eslint-loader"
				]
			},

			{
				test:    /\.css$/,
				exclude: /src/,
				use:     [
					"style-loader",
					{
						loader:  "css-loader",
						options: {
							importLoaders: 1,
						}
					},
					"postcss-loader"
				]
			},

			{
				test:    /\.css$/,
				exclude: /node_modules/,
				use:     [
					"style-loader",
					{
						loader:  "css-loader",
						options: {
							importLoaders:  1,
							modules:        true,
							localIdentName: "[name]__[local]___[hash:base64:5]"
						}
					},
					"postcss-loader"
				]
			},

			{
				test:    /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader:  "url-loader",
				options: {
					limit:    10000,
					mimetype: "application/font-woff"
				}
			},

			{
				test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			}
		]
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
			DEBUG:    false
		})
	]
};