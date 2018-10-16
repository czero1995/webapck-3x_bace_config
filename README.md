	npm install
	npm run dev
	npm run build
	
# Webpack多页面实现公共头部尾部和分离生产环境
![](http://www.z4a.net/images/2017/12/15/8GSH18R2E56J5BLUHK9TGM.md.png)
#### 在日常开发中，经常会遇到这种类似头部和尾部，多个页面的拥有相同的HTML结构，如果每个页面都添加这种一样的代码，会让文件显得臃肿，且后期维护成本也很大。因此，我们可以将这些共用的HTML抽取出来形成类似组件的形式，在页面中直接引入就可以

### gulp实现共用HTML
[参考这里](https://www.cnblogs.com/woodk/p/5613280.html
)
	不推荐，因为无法实时编译。

### 用Webpack的ejs模板实现HTML共用:
#### 项目结构:![](http://www.z4a.net/images/2017/12/15/8R5EGZ8YQPF3MRMJFN.md.png)

#### 在线浏览[http://github.czero.cn/webpackcommon/](http://github.czero.cn/webpackcommon/)
####  [Github源码,欢迎star](https://github.com/czero1995/webpack-common)
#### 安装

	npm install ejs-loader 
	npm install ejs-render-loader
	npm install ejs-html-loader
#### 在webpack.config.js的loader里面添加

	{
		test: /\.ejs$/,
		loader: 'ejs-html-loader',			     
	},
#### 把.html后缀名改为.ejs
然后再HTMLWebpackPlugin里面指定template为

	template: 'ejs-render-loader!index.ejs',

创建公共html放在common文件夹中，这个demo是共用header和footer，然后创建header.html和footer.html
#### common/header.html

	<header class="header_tab inlink-flex">
		<a href="index.html"><div class="tabItem tabIndex">首页</div></a>
		<a href="second.html"><div class="tabItem tabSecond">第二页</div></a>
		<a href="three.html"><div class="tabItem tabThree">第三页</div></a>
	</header>

#### common/footer.html

	<footer>
		这是共用的尾部代码
	</footer>


### 在.ejs里面引入公共页面的头部和尾部
#### index.ejs

	<% include common/header.html %>
	<div>这是首页</div>
	<% include common/footer.html %>

#### second.js
	<% include common/header.html %>
		<div>这是第二页</div>
	<% include common/footer.html %>


这样就可以实现html共用的问题了。

* 但是还有个情况就是，npm run dev调试代码的时候.ejs文件里面引用的img路径会找不到。


解决方法是在webpack.config.js里面添加 CopyWebpackPlugin，把img文件夹拷贝到生产环境

### 在webpack.config.js中引入插件
	var CopyWebpackPlugin = require('copy-webpack-plugin');

### 在module.exports 中 plugins：
	new CopyWebpackPlugin([{
	     from: 'runtime/images/*'
	}])

# 开发环境和生产环境分离
#### 将开发环境和生产环境分离，可以提高代码的可读性和可维护性在不同环境声声明不同的调试方式，执行和打包的速度也不一样
比方说在开发环境中，我们可以不使用

	babel,ExtractTextPlugin,UglifyJSPlugin,postcss等
	
一些loader和插件的使用，因为这样可以加快我们的编译速度，减少等待的时间，提高开发效率。

#### 在生产环境中，我们需要对文件进行压缩，去除空白和注释，添加css后缀，在js文件中添加声明注释，将css分离，将es6转化成es5，提高兼容性等等。
##方法:
### 在package.json文件中
	"scripts": {
	    "build": "webpack --optimize-minimize",
	    "dev": "webpack-dev-server --config webpack.dev.config.js --open",
	    "start": "npm run dev"
	  },

 在script声明中，指定dev运行的是webpack的	
 
 	npm run dev
 	
 	执行webpack.dev.config.js配置
 	
 ![](http://www.z4a.net/images/2017/12/15/TIM20171215155706.md.png)
	
 当执行
 
	 npm run build
	 
	 执行webpack.config.js配置