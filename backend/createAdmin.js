require('dotenv').config(); 
const bcrypt = require('bcrypt');
const sequelize = require('./api/config/database');
const User = require('./api/models/user');         

// Read default admin credentials from .env or hardcode them
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const DEFAULT_ADMIN_PINCODE = process.env.ADMIN_PINCODE || '1234'; 
const DEFAULT_ADMIN_UID = process.env.ADMIN_UID || 'admin-uid-001'; 

(async () => {
  try {
    // 1) Connect to the DB
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // 2) Check if an admin user already exists
    const existingAdmin = await User.findOne({ 
      where: { username: DEFAULT_ADMIN_USERNAME } 
    });
    if (existingAdmin) {
      console.log('Admin user already exists. Exiting...');
      process.exit(0);
    }

    // 3) Hash the password
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);

    // 4) Create the admin user, including pinCode and uid
    const adminUser = await User.create({
      username: DEFAULT_ADMIN_USERNAME,
      email: DEFAULT_ADMIN_EMAIL,
      password: hashedPassword,
      pinCode: DEFAULT_ADMIN_PINCODE,
      uid: DEFAULT_ADMIN_UID,
      isAdmin: true,
    });

    console.log('Admin user created successfully:', adminUser.toJSON());
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    // 5) Close the DB connection
    await sequelize.close();
    process.exit(0);
  }
})();
