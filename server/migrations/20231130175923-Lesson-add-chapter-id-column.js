'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("lessons", "chapterId", {
      type: DataTypes.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("lessons", "chapterId");
  }
};
