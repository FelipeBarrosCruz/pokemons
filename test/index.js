require('chai').should()
const Helper = require('./helper')
const Server = require('../index')


describe('Test Pokemon Module', () => {

  before((done) => {
    Server.then((server) => {
      this.server = server
      done(null)
    }).catch((err) => {
      done(err)
    })
  })

  it ('Should return all pokemons', (done) => {
    const request = Helper.buildRequest({
      method: 'GET',
      path: '/pokemons'
    })
    this.server.inject(request)
      .then((response) => {
        response.statusCode.should.equal(200)
        done()
      }).catch(err => done(err))
  })
})
