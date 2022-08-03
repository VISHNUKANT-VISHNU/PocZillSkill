'use strict'
const path = require('path')
const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (process.env.NODE_ENV !== 'production' ? console.log : null),
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  }
})

module.exports = sequelize