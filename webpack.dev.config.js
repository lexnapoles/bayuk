const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

const devConfig = merge(
  {
    mode: "development",
    entry: ["webpack-hot-middleware/client"],

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  },
  baseConfig
);

module.exports = devConfig;
