var path         = require("path"),
		autoprefixer = require('autoprefixer');

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
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "eslint-loader"
			}
		],

		loaders: [
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "babel-loader"
			},

			{
				test:    /\.css$/,
				exclude: /src/,
				loader:  "style!css-loader!postcss-loader"
			},

			{
				test:    /\.css$/,
				exclude: /node_modules/,
				loader:  "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
			},

			{
				test:   /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},

			{
				test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			}

		]
	},

	postcss: [autoprefixer({browsers: ['last 2 versions']})],

	resolve: {
		extensions: ['', '.js']
	}
};