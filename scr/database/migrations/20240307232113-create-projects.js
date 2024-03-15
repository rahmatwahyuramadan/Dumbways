'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project: {
        type: Sequelize.STRING
      },
      date1: {
        type: Sequelize.DATE
      },
      date2: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      node: {
        type: Sequelize.STRING,
      },
      next: {
        type: Sequelize.STRING,
      },
      react: {
        type: Sequelize.STRING,
      },
      golang: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};