'use strict'
const path = require('path')
const fs = require("fs")
const config = require('./index')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//项目信息
const projectInfo = require('./multipage.project')


let baseURL = './src/'+projectInfo.name+'/pages';	//根路径
let moduleList = getModuleList(baseURL);	//页面

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
//获取当前目录中文件
function getModuleList(path){
	let list = [];
	let fsList = fs.readdirSync(path);	//所有目录
	fsList.forEach(function(item,index){
		let module = {
			id : item,
			js : path+'/'+item+'/index.js',
			html : path+'/'+item+'/index.html',
			favicon : path+'/'+item+'/favicon.ico'
		}
		list.push(module);
	})
	return list;
}

//webpack.base.conf.js entry
function getEntries(){	
	//js入口数组
	let entries = {}
	//变量模块列表
   	moduleList.forEach(function (item) {
	    if(item.id){
	    	entries[item.id] = item.js;
	    }
	})
	return entries;
}

//webpack.dev.conf.js  HtmlWebpackPlugin
function getDevHtmlList(){
	//缓存dev的Html模板
	let devList = [];
	
	moduleList.forEach(function (item) {
	    if(item.id){
	    	let opts = {
				filename: item.html,
		      	template: item.html,
		      	favicon: resolve(item.favicon),
		      	inject: true,
		      	chunks: [item.id, "vendor", "manifest"]
		    }
	    	devList.push(new HtmlWebpackPlugin(opts));
	    }
	})
	return devList;
}

//webpack.dev.conf.js devServer.historyApiFallback.rewrites
function getHistoryRewrites(){
	//缓存dev的 historyApiFallback.rewrites
	let historyList = [];
	
	moduleList.forEach(function (item) {
	    if(item.id){
	    	if(item.id == 'index'){
	    		let opts = { 
		      		from: /.*/, 
		      		to: path.posix.join(config.dev.assetsPublicPath, item.html) 
		      	}
		    	historyList.push(opts);	    		
	    	}else{
	    		let opts = { 
		      		from: new RegExp('^\/'+item.id+''), 
		      		to: path.posix.join(config.dev.assetsPublicPath, item.html) 
		      	}
		    	historyList.unshift(opts);	
	    	}
	    }
	})
	
	return historyList;
}

//webpack.prod.conf.js  HtmlWebpackPlugin
function getProdHtmlList(){	    
    //缓存dev的Html模板
	let prodList = [];
	
	moduleList.forEach(function (item) {
	    if(item.id){
	    	let filename;
	    	if(item.id == 'index'){
	    		filename = config.build.index;
	    	}else{
	    		filename = config.build.assetsRoot+'/'+item.id+'/index.html'
	    	}	    	
	    	let opts = {        
				filename: filename,
			  	template: item.html,
			  	favicon: resolve(item.favicon),
			  	inject: true,
			  	minify: {
				    removeComments: true,
				    collapseWhitespace: true,
				    removeAttributeQuotes: true        
			  	},
			  	chunksSortMode: 'dependency'
    		}
	    	prodList.push(new HtmlWebpackPlugin(opts));
	    }
	})
	return prodList;    
}

module.exports = {
	getEntries,
	getDevHtmlList,
	getHistoryRewrites,
	getProdHtmlList,
	project : projectInfo
}
