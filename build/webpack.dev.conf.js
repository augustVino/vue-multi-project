'use strict'
const path = require('path')
// 首先引入的是一些工具方法，下面我们就需要去util文件种看一下有哪些对应的工具方法
const utils = require('./utils')
// 引入webpack模块
const webpack = require('webpack')
// 引入配置文件
// 这个配置文件中包含了一些dev和production环境的基本配置
const config = require('../config')
// 引入webpack-merge模块。这个模块用于把多个webpack配置合并成一个配置，后面的配置会覆盖前面的配置。
const merge = require('webpack-merge')
// 引入webpack的基本设置，这个设置文件包含了开发环境和生产环境的一些公共配置
const baseWebpackConfig = require('./webpack.base.conf')
// 
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 用于生成html文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 这个插件能够更好的在终端看到webpack运行时的错误和警告等信息。可以提升开发体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 查找一个未使用的端口
const portfinder = require('portfinder')

//新增多页配置
const multipage = require('../config/multipage');   


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// 获取host环境变量，用于配置开发环境域名
const HOST = process.env.HOST
// 获取post环境变量，用于配置开发环境时候的端口号
const PORT = process.env.PORT && Number(process.env.PORT)

// 开发环境的完整的配置文件，
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        // 为那些独立的css类型文件添加loader配置（没有写在vue文件的style标签中的样式）
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // 开发环境使用'eval-source-map'模式的source map
    // 因为速度快
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    // 下面是对webpack-dev-server选项的基本配置，这些配置信息，我们可以在/config/index.js
    // 文件中进行自定义配置。
    devServer: {
        // 用于配置在开发工具的控制台中显示的日志级别
        // 注意这个不是对bundle的错误和警告的配置，而是对它生成之前的消息的配置
        clientLogLevel: 'warning',
        // 表示当使用html5的history api的时候，任意的404响应都需要被替代为index.html
        // historyApiFallback: true,
        historyApiFallback: {
            // rewrites: [
            //   { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            // ],
            // 此处替换为multipage.getHistoryRewrites()方法
            rewrites : multipage.getHistoryRewrites()
        },
        // 启用webpack的热替换特性
        hot: true,
        // 一切服务都需要使用gzip压缩
        // 可以在js，css等文件的response header中发现有Content-Encoding:gzip响应头
        compress: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        // 指定使用一个 host。默认是 localhost
        // 如果希望服务器外部可以访问(通过我们电脑的ip地址和端口号访问我们的应用)
        // 可以指定0.0.0.0
        host: HOST || config.dev.host,
        // 指定要监听请求的端口号
        port: PORT || config.dev.port,
        // 是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 当编译出现错误的时候，是否希望在浏览器中展示一个全屏的蒙层来展示错误信息
        overlay: config.dev.errorOverlay
          // 表示只显示错误信息而不显示警告信息
          // 如果两者都希望显示，则把这两项都设置为true
          ? { warnings: false, errors: true }
          // 设置为false则表示啥都不显示
          : false,
        // 指定webpack-dev-server的根目录，这个目录下的所有的文件都是能直接通过浏览器访问的
        // 推荐和output.publicPath设置为一致
        publicPath: config.dev.assetsPublicPath,
        // 配置代理，这样我们就可以跨域访问某些接口
        // 我们访问的接口，如果符合这个选项的配置，就会通过代理服务器转发我们的请求
        proxy: config.dev.proxyTable,
        // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        quiet: true, // necessary for FriendlyErrorsPlugin
        // 与监视文件相关的控制选项。
        watchOptions: {
            // 如果这个选项为true，会以轮询的方式检查我们的文件的变动，效率不好
            poll: config.dev.poll,
        }
    },
    plugins: [
        // 创建一个在编译时可以配置的全局变量
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        // 启用热替换模块
        // 记住，我们永远不要再生产环境中使用hmr
        new webpack.HotModuleReplacementPlugin(),
        // 这个插件的主要作用就是在热加载的时候直接返回更新文件的名称，而不是文件的id
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // 使用这个插件可以在编译出错的时候来跳过输出阶段，这样可以确保输出资源不会包含错误。
        new webpack.NoEmitOnErrorsPlugin(),
        // 这个插件主要是生成一个html文件
        // new HtmlWebpackPlugin({
        //   // 生成的html文件的名称
        //   filename: 'index.html',
        //   // 使用的模板的名称
        //   template: 'index.html',
        //   // 将所有的静态文件都插入到body文件的末尾
        //   inject: true
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})


// HtmlWebpackPlugin 替换HtmlWebpackPlugin方法
var devHtmlList = multipage.getDevHtmlList();
devHtmlList.forEach(function(item){
    devWebpackConfig.plugins.push(item)
})