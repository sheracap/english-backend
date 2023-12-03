'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("courses", "description", {
      type: DataTypes.STRING(500)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("courses", "description", {
      type: DataTypes.STRING
    });
  }
};
