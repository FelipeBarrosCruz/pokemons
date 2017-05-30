const PaymentLibrary = require('../../lib/payment')
const _ = require('lodash')

module.exports = function Model (Entity) {
  function create (payload) {
    return new Promise((resolve, reject) => {
      return Entity.create(payload, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }

  function findOne (query) {
    return new Promise((resolve, reject) => {
      return Entity.findOne(query, (err, response) => {
        if (err || !response) return reject(err || new Error('Pokemon not found'))
        return resolve(response)
      })
    })
  }

  function findAll () {
    return new Promise((resolve, reject) => {
      return Entity.find((err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }

  function update (query, updateData) {
    return new Promise((resolve, reject) => {
      return Entity.update(query, updateData, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }


  function remove (query) {
    return new Promise((resolve, reject) => {
      return Entity.remove(query, (err, response) => {
        if (err) return reject(err)
        return resolve(response)
      })
    })
  }

  function buy (query, payload) {
    return new Promise((resolve, reject) => {
      return findOne(query)
        .then((pokemon) => {
          if (payload.quantity > pokemon.stock) throw new Error('Quantity not allowed in stock')
          const paymentPayload = _.extend({
            amount: (pokemon.price * payload.quantity) * 100,
            metadata: {
              product: 'pokemon',
              name: pokemon.name,
              quantity: payload.quantity
            }
          }, payload.card)
          return PaymentLibrary.createTransaction(paymentPayload)
        })
        .then((transaction) => {
          if (transaction.status !== 'paid') throw new Error(transaction.refuse_reason)
          return update(query, { $inc: { stock: (payload.quantity * -1) } })
        })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    buy
  }
}
