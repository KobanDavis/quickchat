const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	target: 'node',
	output: {
		filename: 'quickchat.js',
		path: path.resolve(__dirname, 'dist'),
		chunkFormat: 'commonjs'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						reduce_vars: false
					}
				}
			})
		]
	}
}
