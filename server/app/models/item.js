'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemsForSale = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.User, { foreignKey: 'user_id'})
      }
    }
  });
  return Item;
};