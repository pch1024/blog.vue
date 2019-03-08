const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        // exclude: /node_modules/,
        options: {
          limit: 10000,
          name: './assets/[name].[ext]?[hash]' // 源文件
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          filename: 'js/[name].bundle.js',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: 'src/static/',
          to: '../dist'
        }
      ],
      { debug: true }
    ),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      minify: true,
      title: 'PCH1024',
      template: 'index.ejs',
      favicon: 'favicon.ico'
    })
  ]
}
