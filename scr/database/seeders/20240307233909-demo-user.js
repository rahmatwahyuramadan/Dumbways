'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('projects', [{
       project: 'dumbways',
       date1: '1/1/2024',
       date1: '1/1/2024',
       description: 'anjay',
       node: true,
       next: true,
       react: true,
       golang: true,
        createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('projects', null, {});
    
  }
};
