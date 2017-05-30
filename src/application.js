const Server = require('./server')
const Database = require('./database')

module.exports = function Application (environment) {
  return new Promise((resolve, reject) => {
    return new Database(environment)
      .then(() => new Server(environment))
      .then(server => resolve(server))
      .catch(err => reject(err))
  })
}
