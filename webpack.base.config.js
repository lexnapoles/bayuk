var path = require("path");

var DIST_DIR   = path.join(__dirname, "dist"),
		CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
	context: CLIENT_DIR,

	entry: "./main",

	output: {
		path:     DIST_DIR,
		filename: "bundle.js"
	},

	module: {
		preLoaders: [
			{
				test:    /\.jsx?$/,
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
				test:   /\.css$/,
				loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
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