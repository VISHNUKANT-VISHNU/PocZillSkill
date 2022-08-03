'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
require('dotenv').config()
let basename = path.basename(__filename)

let db = {}
let sequelize;
sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (process.env.NODE_ENV !== 'production' ? console.log : null),
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  }
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
    console.log(model.name)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// console.log(db)

module.exports = db
