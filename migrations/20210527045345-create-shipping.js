'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer: {
        type: Sequelize.STRING
      },
      shippingStatusId: {
        type: Sequelize.INTEGER,
        references: { model: 'ShippingStatuses', key: 'id' }
      },
      descript: {
        type: Sequelize.STRING
      },
      originLat: {
        type: Sequelize.DECIMAL(11, 8)
      },
      originLong: {
        type: Sequelize.DECIMAL(11, 8)
      },
      currentLat: {
        allowNull: true,
        type: Sequelize.DECIMAL(11, 8)
      },
      currentLong: {
        allowNull: true,
        type: Sequelize.DECIMAL(11, 8)
      },
      endLat: {
        type: Sequelize.DECIMAL(11, 8)
      },
      endLong: {
        type: Sequelize.DECIMAL(11, 8)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shippings');
  }
};