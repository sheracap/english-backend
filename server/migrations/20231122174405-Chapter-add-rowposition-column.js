'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("chapters", "rowPosition", {
      type: DataTypes.INTEGER,
      autoIncrement: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("chapters", "rowPosition");
  }
};
