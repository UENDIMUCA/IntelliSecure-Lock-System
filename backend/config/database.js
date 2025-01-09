const { Sequelize } = require('sequelize');//sequelize constructor:

// Initialize Sequelize instance to connect to db
const sequelize = new Sequelize('smartdoor', 'postgres', 'admin', {
  host: 'localhost',//db server
  dialect: 'postgres', // Use PostgreSQL
  logging: false, // Disable SQL query logging in the console
});

module.exports = sequelize;
