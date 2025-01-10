const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/user');

module.exports = {
  login: async (req, res) => {
    // Destructure 'username' from req.body
    const { username, password } = req.body;

    try {
      // Search by 'username'
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Send success response with user info
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};