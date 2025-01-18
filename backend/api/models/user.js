const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  pinCode: { type: DataTypes.STRING, allowNull: false },
  uid: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  beginDate: { type: DataTypes.DATE, allowNull: true },
  endDate: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'users', // Explicitly set the table name
  timestamps: true,
});

const saltRounds = 10;

// Hook Sequelize pour hasher le mot de passe avant de sauvegarder
User.beforeCreate(async (user) => {

  user.password = await bcrypt.hash(user.password, saltRounds);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

// Hook Sequelize pour créer un admin par défaut après la synchronisation de la table
User.afterSync(async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPincode = process.env.ADMIN_PINCODE;
  const adminUid = process.env.ADMIN_UID;


  const adminExists = await User.findOne({ where: { username: adminUsername } });

  if (!adminExists) {
    await User.create({
      username: adminUsername,
      password: adminPassword,
      email: adminEmail,
      pinCode: adminPincode,
      uid: adminUid,
      isAdmin: true,
    });
    console.log(`Admin user created with username: ${adminUsername}`);
  }
});

module.exports = User;
