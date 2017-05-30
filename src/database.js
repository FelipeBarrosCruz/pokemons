const Mongoose = require('mongoose');

module.exports = function DatabaseWrapper (environment) {
  return new Promise((resolve, reject) => {
    Mongoose.connection.on('open', () => {
      console.info('Database connected')
      return resolve(Mongoose)
    })
    Mongoose.connection.on('error', (err) => {
      console.error('Database error', err)
      return reject(err)
    })
    return Mongoose.connect(environment.database)
  })
}
