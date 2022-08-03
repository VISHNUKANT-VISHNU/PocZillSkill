'use strict'

const common =  require('../lib/common.js')
const user = require('../controllers/users')
const basketItems = require('../controllers/basket')
let pref = process.env.PREF

const users = (server) => {
  server.post(pref + '/addUserTest', [user.addUser, common.final]);
  server.post(pref + '/addBasketItems', [basketItems.addBasketItems, common.final]);
  server.post(pref + '/addBasket', [basketItems.addBasket, common.final]);
}

module.exports = {users}
