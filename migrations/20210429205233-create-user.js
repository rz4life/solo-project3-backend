'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.TEXT
      },
      lastname: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT,
        unique:true
      },
      password: {
        type: Sequelize.TEXT
      },
      number: {
        type: Sequelize.TEXT,
        unique:true
      },
      region: {
        type: Sequelize.TEXT
      },
      sex: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TEXT
      },
      lookingfor: {
        type: Sequelize.TEXT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};