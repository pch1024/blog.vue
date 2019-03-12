const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')

module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c|le)ss$/,
        // exclude: /node_modules/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '192.168.0.104',
    hot: true,
    open: true,
    port: 9000,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true, // VUE history
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: '47.244.29.42:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  devtool: 'cheap-eval-source-map', // enum
  mode: 'development'
})
