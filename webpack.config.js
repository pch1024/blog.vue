const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader在15之后需要在webpack.config.js中当插件引入
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let mode = process.env.NODE_ENV;

let cssLoader = {
	dev: 'style-loader',
	pro: {
		loader: MiniCssExtractPlugin.loader,
		options: {
			publicPath: '../',
		},
	},
};
let devtool = {
	dev: '#cheap-module-eval-source-map',
	pro: 'none',
};
let plugins = [
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
		hash: true,
		inject: true,
		minify: true,
		title: 'vue',
		template: 'index.ejs',
		favicon: 'favicon.ico',
	}),
	new CopyWebpackPlugin([
		{
			from: path.resolve(__dirname, './static'),
			to: path.resolve(__dirname, './dist/static'),
			ignore: ['.*'],
			force: true,
		},
	]),
];

if (mode == 'pro') {
	plugins = plugins.concat([
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css',
		}),
	]);
}

module.exports = {
	entry: ['@babel/polyfill', path.resolve(__dirname, './src/main.js')],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/app.js',
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c|le)ss$/,
				exclude: /node_modules/,
				use: [
					cssLoader[mode], // 将 JS 字符串生成为 style 节点
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(woff2?|eot|ico|ttf|otf|png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[ext]?[hash]', // 源文件
				},
			},
		],
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	plugins: plugins,
	mode: 'development',
	devtool: devtool[mode],
};
