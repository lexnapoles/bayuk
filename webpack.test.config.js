const path       = require("path"),
			merge      = require("webpack-merge"),
			baseConfig = require("./webpack.base.config.js");

const testConfig = merge(baseConfig, {
	entry: null,

	externals: {
		'cheerio':                        'window',
		'react/addons':                   'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext':         'react'
	},

	devtool: "inline-source-map",

	resolve: {
		alias: {
			Components: path.resolve(__dirname, "src/components")
		}
	}
});

module.exports = testConfig;

