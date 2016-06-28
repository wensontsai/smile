'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemsForSale = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Item;
};