'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("chapters", "rowPosition", {
      type: DataTypes.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("chapters", "rowPosition", {
      type: DataTypes.INTEGER
    });
  }
};
