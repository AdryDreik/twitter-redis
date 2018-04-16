var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/"',
  AUTH_URL: '"http://localhost:3100/auth"',
  ONBEFOREUNLOAD: false,
  DEBUG_MODE: true
})
