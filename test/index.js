require('chai').should()
const Helper = require('./helper')
const Mock = require('./mock')
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

  it ('Shoud create a pokemon', (done) => {
    const request = Helper.buildRequest({
      method: 'POST',
      path: '/pokemons',
      payload: Mock.createMock
    })
    this.server.inject(request)
      .then((response) => {
        response.statusCode.should.equal(201)
        done()
      }).catch(err => done(err))
  })

  it ('Shoud select a unique pokemon', (done) => {
    const request = Helper.buildRequest({
      method: 'GET',
      path: ['pokemons', Mock.selectMock._id]
    })
    this.server.inject(request)
      .then((response) => {
        response.statusCode.should.equal(200)
        done()
      }).catch(err => done(err))
  })

  it ('Shoud update a pokemon', (done) => {
    const request = Helper.buildRequest({
      method: 'PUT',
      path: ['pokemons', Mock.updateMock._id],
      payload: Mock.updateMock.payload
    })
    this.server.inject(request)
      .then((response) => {
        response.statusCode.should.equal(200)
        done()
      }).catch(err => done(err))
  })

  it ('Shoud remove a pokemon', (done) => {
    const request = Helper.buildRequest({
      method: 'DELETE',
      path: ['pokemons', Mock.deleteMock._id]
    })
    this.server.inject(request)
      .then((response) => {
        response.statusCode.should.equal(200)
        done()
      }).catch(err => done(err))
  })
})
