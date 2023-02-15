const bcrypt = require("bcrypt");
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const password = bcrypt.hash("password", 10);
    return queryInterface.bulkInsert('User', [{
      username: 'test',
      email: 'test@example.com',
      password,
      img_path: '/images/default/avatar-1.png'
    }]); 
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.bulkDelete('User', null, {});
  }
};
