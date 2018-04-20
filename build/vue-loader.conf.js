'use strict'
const utils = require('./utils')
const config = require('../config')
// 设置是不是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 根据不同的环境，引入不同的source map配置文件
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
    // vue文件中的css loader配置
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        // 生产环境下就会把css文件抽取到一个独立的文件中
        extract: isProduction
    }),
    // css source map文件的配置
    cssSourceMap: sourceMapEnabled,
    // css source map文件缓存控制变量
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
