const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const Slug = require('slug')

function normalize (value) {
  return Slug(value).toLowerCase()
}

module.exports = Mongoose.model('pokemons', new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    set: normalize
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false
}))
