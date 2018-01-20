const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const prodConfig = merge({
  devtool: 'cheap-module-source-map',
}, baseConfig);

module.exports = prodConfig;
