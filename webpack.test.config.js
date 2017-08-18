const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
  entry: null,

  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
    },
  },
});

