import webpack from 'webpack'

import paths from './paths'
import rules from './rules'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js'
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
                localIdentName: '[path]__[local]'
              }
            }
          },
          'sass-loader'
        ]
      }
    ])
  },
  performance: {
    hints: false,
    maxAssetSize: 450000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
