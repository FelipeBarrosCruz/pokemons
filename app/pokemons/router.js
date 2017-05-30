const Entity = require('./entity')
const Model = require('./model')(Entity)
const Handler = require('./handler')(Model)
const Validate = require('./validate')

const BASE_PATH = '/pokemons'

module.exports = [{
  method: 'GET',
  path: `${BASE_PATH}/{id?}`,
  config: {
    tags: ['api'],
    description: 'Select the pokemons',
    notes: 'Returns 200 with pokemon list or a unique pokemon',
    handler: Handler.SelectHandler
  }
}, {
  method: 'POST',
  path: BASE_PATH,
  config: {
    tags: ['api'],
    description: 'Create the pokemon',
    notes: 'Returns 201 with pokemon',
    handler: Handler.CreateHandler,
    validate: Validate.CreateValidate
  }
}, {
  method: 'POST',
  path: `${BASE_PATH}/{id}/buy`,
  config: {
    tags: ['api'],
    description: 'Create the pokemon',
    notes: 'Returns 201 with pokemon',
    handler: Handler.BuyHandler,
    validate: Validate.BuyValidate
  }
}]

