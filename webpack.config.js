require('@babel/register')
const webpackMerge = require('webpack-merge')

const common = require('./config/webpack.common')

const envs = {
  development: 'dev',
  production: 'prod'
}

const envConfig = (env = 'development') =>
  require(`./config/webpack.${envs[env]}`)
module.exports = (env, argv) => webpackMerge(common, envConfig(argv.mode))
