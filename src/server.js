const Hapi = require('hapi')
const HapiRouter = require('hapi-router')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Logger = require('../lib/logger')
const Server = new Hapi.Server()

module.exports = function ServerWrapper(environment) {
  return new Promise((resolve, reject) => {
    Server.connection(environment.server)

    Server.register({
      register: HapiRouter,
      options: {
        routes: `${environment.router}`
      }
    }, (err) => {
      if (err) throw err
    })

    Server.register([
      Inert,
      Vision, {
        register: HapiSwagger,
        options: {
          info: {
            title: 'Pokemon API',
            version: '0.0.1'
          },
          debug: true
        }
      }], (err) => {
      if (err) throw err
    })

    Server.start((err) => {
      if (err) {
        Logger.error('Server error', err)
        return reject(err)
      }
      Logger.info(`Server running on [${environment.server.port}] port`)
      return resolve(Server)
    })
  })
}
