'use strict'
const Sequelize = require('sequelize')
const basketItems = require('./basketItems')
const { INTEGER, STRING, BIGINT, ARRAY } = require('sequelize/lib/data-types')
const { _isPrimaryKey, autoIncrementAttribute } = require('sequelize/lib/model')

module.exports = (sequelize, DataTypes) => {
  const baskets = sequelize.define('baskets', {

	user_id:{
		type:BIGINT,
		_isPrimaryKey:true,
		autoIncrementAttributeL:true
	},
	produc_list:{ type : Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: null}
  });
  baskets.associate = (models) => {
	baskets.hasMany(models.basketItems, {as:"basketItems"});
};
  baskets.sync()
  return baskets
}
	