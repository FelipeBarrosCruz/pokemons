module.exports = ((NODE_ENV) => {
  const Application = require('./src/application')
  const Environment = require(`./env/${NODE_ENV}`)
  return new Application(Environment)
})(process.env.NODE_ENV = process.env.NODE_ENV || 'development')
