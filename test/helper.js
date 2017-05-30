const _ = require('lodash')
const QueryString = require('qs')
const NODE_ENV = process.env.NODE_ENV || 'testing'
const Environment = require(`../env/${NODE_ENV}`)

const DEFAULT_OPTIONS = {
  method: 'GET',
  url: `http://${Environment.server.host}:${Environment.server.port}`
}
function buildRequest (data) {
  const options = _.clone(DEFAULT_OPTIONS)
  if (data.path) {
    options.url = Array.isArray(data.path)
                ? options.url.concat(`/${data.path.join('/')}`)
                : options.url.concat(data.path)
  }
  if (data.query) {
    options.url = options.url.concat(`?${QueryString.stringify(data.query)}`)
  }
  if (data.payload) {
    options.payload = data.payload
  }
  if (data.method) {
    options.method = data.method
  }
  return options
}

module.exports = {
  buildRequest
}
