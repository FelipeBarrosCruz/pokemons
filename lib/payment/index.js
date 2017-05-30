module.exports = (function Payment (configuration) {
  const PagarMe = require('pagarme')

  function createClient (opts) {
    return PagarMe.client.connect(opts || configuration.auth)
  }

  function createTransaction (payload) {
    return new Promise((resolve, reject) => {
      createClient()
        .then(client => client.transactions.create(payload))
        .then(transaction => resolve(transaction))
        .catch(err => reject(err))
    })
  }

  return {
    createTransaction
  }
}(require('./config.json')))
