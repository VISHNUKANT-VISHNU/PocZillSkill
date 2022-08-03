'use-strict'

const Sequelize = require('sequelize')
const { INTEGER, STRING, BIGINT, FLOAT } = require('sequelize/lib/data-types')

module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define('product',{
		product_price:{
			type:FLOAT,
		},
		product_inventory:{
			type:BIGINT
		}

	})
	product.sync()
	return product

}