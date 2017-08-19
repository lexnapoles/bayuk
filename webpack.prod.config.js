import merge from 'webpack-merge';
import baseConfig from './webpack.base.config';

export default merge({
  devtool: 'cheap-module-source-map',
}, baseConfig);
