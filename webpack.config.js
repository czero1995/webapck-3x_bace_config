const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); /*每次编译之前，先删除之编译好的文件夹*/
const ExtractTextPlugin = require("extract-text-webpack-plugin"); /*提取css到为单独文件*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') /*精简输出*/
module.exports = {
	entry: {		
		index: './js/index.js', /*首页*/	
		second:'./js/second.js', /*第二页*/
		three: './js/three.js', /*第三页*/		
	},
	devtool: 'inline-source-map', 
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "./js/[name].js", 
	},
	module: {
		loaders: [{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"es2015"
						]
					}
				},
				exclude: /node_modules/
			},
			
			{
				test: /(\.less|\.css)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!less-loader!postcss-loader",
				})

			},
			{
			      test: /\.ejs$/,
			      loader: 'ejs-html-loader',			     
			  },
			 {
			 	//提取html里面的img文件
		        test: /\.(htm|html)$/i,
		        loader: 'html-withimg-loader',
		   },
			   {
			   	//图片打包
			   	test:/(\.jpg|\.png|\.gif|\.jpeg|\.ttf)$/, 
			   	use:{
			   		loader:'file-loader',
			   		 options: {
			   		 	outputPath: '/',
			   		 	name:'[name].[ext]',		   		 	
				      	useRelativePath:true
				    }
			   	}
			   },			 
		]
	},
	plugins: [
		new webpack.BannerPlugin('xx所有，翻版必究'),
		new ExtractTextPlugin('./css/[name].css'),				
		// html文件输出
		new HtmlWebpackPlugin({
			title: '首页',
			filename: 'index.html',
			template: 'ejs-render-loader!pages/index.ejs',			
			chunks: ['index'],
			hash:true,
			cach:true,
			minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
		}),
		new HtmlWebpackPlugin({
			title: '第二页',
			filename: 'second.html',
			template: 'ejs-render-loader!pages/second.ejs',			
			chunks: ['second'],
			hash:true,
			cach:true,
			minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
		}),
		new HtmlWebpackPlugin({
			title: '第三页',
			filename: 'three.html',
			template: 'ejs-render-loader!pages/three.ejs',			
			chunks: ['three'],
			hash:true,
			cach:true,
			minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
		}),

		new CopyWebpackPlugin([{
		    from: __dirname + '/img',
		    to:'img/'
		}]),
		 new UglifyJsPlugin(),
		new CleanWebpackPlugin(['build']) //编译前先清除文件夹
	],

	resolve:{		
		extensions: [".js",".less",".css"],
	},
	
 
}