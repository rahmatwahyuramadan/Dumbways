'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', 
      [
      {
        name: "Rahmat",
        email: "rahmatwahyu@gmail.com",
        password: "asiap",
        createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: "Wahyu",
      email: "wahyu@gmail.com",
      password: "okegas",
      createdAt: new Date(),
      updatedAt: new Date()
   }
    ], 
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
