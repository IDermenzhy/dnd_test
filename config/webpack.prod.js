import CleanWebpackPlugin from 'clean-webpack-plugin'

import paths from './paths'
import rules from './rules'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = {
  mode: 'production',
  output: {
    filename: `${paths.jsFolder}/[name].[hash].js`,
    path: paths.outputPath,
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: rules.concat([
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:5]'
              },
              sourceMap: false
            }
          },
          'sass-loader'
        ]
      }
    ])
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${paths.cssFolder}/[name].[hash].css`,
      chunkFilename: '[id].[hash].css'
    })
  ],
  devtool: 'source-map'
}
