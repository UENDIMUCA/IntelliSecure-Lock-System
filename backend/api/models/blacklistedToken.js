const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlacklistedToken = sequelize.define('BlacklistedToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'blacklisted_tokens',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
});

module.exports = BlacklistedToken;