'use strict'
const {users} =  require('./users')
const {basket} = require('./basket')
const routes = (server) => {
  server.get('/', (req, res) => {
    res.send('ZillSkill API')
  })
  users(server)
  basket(server)
}
module.exports = {routes}
