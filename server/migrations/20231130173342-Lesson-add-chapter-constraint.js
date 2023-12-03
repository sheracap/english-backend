'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("lessons", {
      fields: ["chapterId"],
      type: "foreign key",
      name: "lesson_chapter_association",
      references: {
        table: "chapters",
        field: "id"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("lessons", {
      fields: ["chapterId"],
      type: "foreign key",
      name: "lesson_chapter_association",
      references: {
        table: "chapters",
        field: "id"
      }
    });
  }
};
