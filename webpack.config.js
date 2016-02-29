const path = require("path");

module.exports = {
	context: path.resolve("src"),
	entry:   "./main",
	output:  {
		path:	path.resolve("dist/js/"),
		publicPath: "public/js/",
		filename: "bundle.js"
	},
	module:  {
		preLoaders: [
			{
				test:    /\.js$/,
				exclude: /node_modules/,
				loader:  "eslint-loader"
			}
		],
		loaders:    [
			{
				test:    /\.js$/,
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
		extensions: ['', '.js']
	}
};