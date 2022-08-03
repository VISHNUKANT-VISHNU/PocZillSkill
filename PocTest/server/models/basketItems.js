'use-strict'

const { sequelize, INTEGER, FLOAT } = require("sequelize")
const { DataTypes } = require("sequelize/lib/sequelize")
const { basket } = require('./baskets')

module.exports = (sequelize, DataTypes) => {
	const basketItems = sequelize.define('basketItems', {
		product_id:{
			type:INTEGER
		},
		qty:{
			type:INTEGER
		},
		price:{
			type:FLOAT
		},
		discount:{
			type:FLOAT
		}
	});

	basketItems.associate = (models) => {
		basketItems.belongsTo(models.baskets, {foreignKey:'id'})
	}

	basketItems.sync()
	return basketItems
}