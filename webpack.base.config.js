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

	devtool: "inline-source-map",

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