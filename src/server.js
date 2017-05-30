const Hapi = require('hapi')
const HapiRouter = require('hapi-router')
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
      if (err) reject(err)
    })

    Server.start((err) => {
      if (err) {
        console.error('Server error', err)
        return reject(err)
      }
      console.info(`Server running on [${environment.server.port}] port`)
      return resolve(Server)
    })
  })
}
