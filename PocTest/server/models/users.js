'use-strict'

const Sequelize = require('sequelize')
const { INTEGER, STRING, BIGINT, FLOAT } = require('sequelize/lib/data-types')

module.exports = (sequalize, DataTypes) => {
const users = sequalize.define('users', {
	user_name:{
		type:STRING
	},
})

users.sync()
return users	
}
