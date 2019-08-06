const path = require('path');

module.exports = {
	entry: `./src/index.js`,
	output: {
		filename: `main.js`,
		path: path.join(__dirname, `./app`),
		publicPath: `app/`
	},
	devServer: {
		overlay: true,
		contentBase: path.join(__dirname, `./app`),
		compress: false,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	}
};