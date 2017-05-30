const ObjectId = require('mongoose').mongo.ObjectId

const createMock = {
  _id: ObjectId('592d9c8cb9128d7095657239'),
  name: 'Pikatchu',
  price: 10,
  stock: 10
}

const selectMock = {
  _id: ObjectId('592d9c8cb9128d7095657239')
}

const updateMock = {
  _id: ObjectId('592d9c8cb9128d7095657239'),
  payload: {
    stock: 5
  }
}

const deleteMock = {
  _id: ObjectId('592d9c8cb9128d7095657239')
}

const buyMock = {
  _id: ObjectId('592d9c8cb9128d7095657239'),
  payload: {
    quantity: 2,
    card: {
      card_number: '4024007138010896',
      card_expiration_date: '1050',
      card_holder_name: 'Ash Ketchum',
      card_cvv: 123
    }
  }
}

module.exports = {
  createMock,
  selectMock,
  updateMock,
  deleteMock,
  buyMock
}
