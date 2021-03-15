'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.1.130:8080"' //汽车俱乐部
  API_ROOT: '"https://mtqs.sijiandl.cn"'//汽车俱乐部,
})
