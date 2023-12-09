"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Movies", [
      {
        name: "Forrest Gump",
        category: "comedy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A Beautiful Mind",
        category: "mistery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Black Mirror",
        category: "mistery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
