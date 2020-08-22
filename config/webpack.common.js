import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import alias from './alias'
import paths from './paths'
import rules from './rules'

module.exports = {
  entry: paths.entryPath,
  module: {
    rules
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.jsx', '.scss', '.css'],
    alias
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
