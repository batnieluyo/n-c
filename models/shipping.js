'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.ShippingStatus = this.belongsTo(models.ShippingStatus);
    }

  };
  Shipping.init({
    customer: DataTypes.STRING,
    shippingStatusId: DataTypes.INTEGER,
    descript: DataTypes.STRING,
    originLat: DataTypes.DECIMAL,
    originLong: DataTypes.DECIMAL,
    currentLat: DataTypes.DECIMAL,
    currentLong: DataTypes.DECIMAL,
    endLat: DataTypes.DECIMAL,
    endLong: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Shipping',
  });

  return Shipping;
};