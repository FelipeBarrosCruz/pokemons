const Mongoose = require('mongoose')
const Logger = require('../lib/logger')

module.exports = function DatabaseWrapper (environment) {
  return new Promise((resolve, reject) => {
    Mongoose.connection.on('open', () => {
      Logger.info('Database connected')
      return resolve(Mongoose)
    })
    Mongoose.connection.on('error', (err) => {
      Logger.error('Database error', err)
      return reject(err)
    })
    return Mongoose.connect(environment.database)
  })
}
