'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('ShippingStatuses', [
        {
          short_code: 'pending',
          name: 'Pendiente',
          description: 'El paquete se encuentra pendiente de envío',
        },
      {
        short_code: 'in_shipping_process',
        name: 'En proceso',
        description: 'El paquete se encuentra en proceso envío',
      },
      {
        short_code: 'delivered',
        name: 'Entregado',
        description: 'El paquete ha sido entregado',
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ShippingStatuses', null, {});
  }
};
