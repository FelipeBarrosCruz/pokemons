const Boom = require('boom')

module.exports = function Handler (Model) {
  function CreateHandler (request, reply) {
    const payload = request.payload || {}
    return Model.create(payload)
      .then(response => reply(response).code(201))
      .catch(err => reply(Boom.badRequest(err)))
  }

  function SelectHandler (request, reply) {
    const query = { _id: request.params.id }
    const doFind = query._id ? Model.findOne : Model.findAll
    doFind(query)
      .then(response => reply(response).code(200))
      .catch(err => reply(Boom.badRequest(err)))
  }

  function BuyHandler (request, reply) {
    const query = { _id: request.params.id }
    const payload = request.payload || {}

    return Model.buy(query, payload)
      .then(response => reply(response).code(200))
      .catch(err => reply(Boom.badRequest(err)))
  }

  return {
    CreateHandler,
    SelectHandler,
    BuyHandler
  }
}
