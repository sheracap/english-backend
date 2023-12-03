'use strict';

const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("courses", "isPrivate", {
      type: DataTypes.BOOLEAN, defaultValue: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("courses", "isPrivate");
  }
};
