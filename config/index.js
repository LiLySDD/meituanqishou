'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,

    errorOverlay: true,// 当出现编译器错误或警告时，在浏览器中显示全屏叠加,覆盖到浏览器的项目页面的上方
    notifyOnErrors: true,// 是否允许窗口弹出错误信息
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
     // webpack使用文件系统（file system）获取文件改动的通知
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,//如果使用了eslint,违反eslint规则的错误和警告也将被显示在浏览器的透明黑色层上面
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',// 开启调试的类型

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,// 是否通过将哈希查询附加到文件名来生成具有缓存清除的源映射[疑问，求解]
    cssSourceMap: false// 开发环境下，不显示cssSourceMap
  },

  build: {
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /**
     * Source Maps
     */
    productionSourceMap: false,// 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
