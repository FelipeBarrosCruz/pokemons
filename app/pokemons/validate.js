const Joi = require('joi')

const CreateValidate = {
  payload: {
    name: Joi.string()
      .required()
      .description('the name of pokemon'),

    price: Joi.number()
      .required()
      .description('the price of pokemon'),

    stock: Joi.number()
      .optional()
      .description('the stock of pokemon')
  }
}

const BuyValidate = {
  payload: {
    quantity: Joi.number()
      .optional()
      .default(1)
      .description('the quantity of pokemon to buy'),

    name: Joi.string()
      .required()
      .description('the pokemon name to buy'),

    card: Joi.object().keys({
      card_number: Joi.string()
        .creditCard()
        .required(),

      card_expiration_date: Joi.string()
        .regex(/\d{4}/)
        .required(),

      card_holder_name: Joi.string()
        .required(),

      card_cvv: Joi.number()
        .required()
        .precision(3)
    })
    .optional()
    .default({
      card_number: '4024007138010896',
      card_expiration_date: '1050',
      card_holder_name: 'Ash Ketchum',
      card_cvv: 123
    })
    .description('the credit card information')
  }
}

module.exports = {
  CreateValidate,
  BuyValidate
}
