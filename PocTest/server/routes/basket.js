'use strict'

const common =  require('../lib/common.js')
const user = require('../controllers/basket')
const basketItems = require('../controllers/basket')
let pref = process.env.PREF

const basket = (server) => {
  server.get(pref + '/getBasket', [user.getBasket, common.final]);
  server.post(pref + '/addBasketItems', [basketItems.addBasketItems, common.final]);
  server.post(pref + '/addBasket', [basketItems.addBasket, common.final]);
}

module.exports = {basket}
